import { useEffect, useRef, useState } from 'react';
import { Input } from '../Input/Input';
import { CurrentRowType, RequestBodyType, UpdateRequestBodyType } from '../../types/types';
import { newRow } from '../../store/reducers/useRows';
import { useAppDispatch } from '../../store/hooks/redux';

import BasketIcon from '../../assets/basket.svg?react';
import RowIcon from '../../assets/row.svg?react';

import style from './Row.module.scss';

type RowTypeProps = {
    className?: string;
    paddingLeft?: number;
    isFirstRow: boolean;
    isEditing: boolean;
    parentId: number | null;
    deleteRow: () => void;
    updateRow: (body: UpdateRequestBodyType) => void;
    submitNewRow: (body: RequestBodyType) => void;
} & CurrentRowType;

export const Row: React.FC<RowTypeProps> = ({
    id,
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
    className = '',
    paddingLeft,
    isFirstRow,
    deleteRow,
    updateRow,
    isEditing,
    parentId,
    submitNewRow,
}) => {
    const [modeNotEdit, setModeNotEdit] = useState<Array<number | string>>([rowName, salary, equipmentCosts, overheads, estimatedProfit]);
    const [isEditingAll, setIsEditingAll] = useState(isEditing);
    const [stateSvg, setStateSvg] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    // для создания новой строки на клиенте
    const createNewRow = (parentId: number) => {
        const newChildRow: CurrentRowType = {
            child: [],
            equipmentCosts: 0,
            estimatedProfit: 0,
            id: parentId,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: 0,
            rowName: '',
            salary: 0,
            supportCosts: 0,
            total: 0,
        };
        dispatch(newRow({ parentId, newChildRow }));
        setIsEditingAll(false);
    };
    // для отправки новой строки на сервер
    const handleSumbitRow = (parentId: number) => {
        const body: RequestBodyType = {
            equipmentCosts: Number(modeNotEdit[2]),
            estimatedProfit: Number(modeNotEdit[4]),
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: Number(modeNotEdit[3]),
            parentId: parentId,
            rowName: modeNotEdit[0] as string,
            salary: Number(modeNotEdit[1]),
            supportCosts: 0
        }
        submitNewRow(body);
    }
    // для изменения строк
    const handleInputChange = (index: number, value: string) => {
        const newModeNotEdit = [...modeNotEdit];
        newModeNotEdit[index] = value;
        setModeNotEdit(newModeNotEdit);
    };
    // =========================================================
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const tagName = (target as HTMLElement).tagName;
        if (
            inputRef.current &&
            !inputRef.current.contains(target) &&
            tagName !== 'INPUT'
        ) {
            setIsEditingAll(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    //  для обновления строки
    const handleUpdateRow = () => {
        const body: UpdateRequestBodyType = {
            rId: parentId as number,
            body: {
                equipmentCosts: Number(modeNotEdit[2]),
                estimatedProfit: Number(modeNotEdit[4]),
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: Number(modeNotEdit[3]),
                rowName: modeNotEdit[0] as string,
                salary: Number(modeNotEdit[1]),
                supportCosts: 0
            }
        }
        updateRow(body);
    }
    // =========================================================
    const onSubmitOrUpdateRow = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSumbitRow(Number(parentId));
        }
        if (event.key === 'Shift') {
            handleUpdateRow();
            setIsEditingAll(false);
        }
    }

    return (
        <div className={`${style.row} ${className}`}>

            <div className={style.row__item}>
                <ul className={style.row__item_list}>
                    <li className={style.row__icon} style={{ paddingLeft: `${paddingLeft}px` }}>
                        <span
                            onMouseOver={() => setStateSvg(true)}
                            onMouseOut={() => setStateSvg(false)}
                            style={{ backgroundColor: `${stateSvg && !isEditingAll ? '#414144' : 'transparent'}` }}
                            className={`${style.row__icon__svg} ${isFirstRow && style.first_element}`}>
                            <button disabled={isEditingAll}>
                                <RowIcon onClick={() => !isEditingAll && createNewRow(id)} />
                            </button>
                            {stateSvg && !isEditingAll && <BasketIcon onClick={deleteRow} />}
                        </span>
                    </li>
                </ul>
            </div>

            <div className={style.row__item}>
                <ul className={style.row__item_list}>
                    {isEditingAll ? modeNotEdit.map((_, index) => (
                        <li key={index} className={style.row__text}>
                            <Input
                                ref={inputRef}
                                className={`${style.row__input} ${index === 0 && style.row__input_first} ${index === modeNotEdit.length - 1 && style.row__input_last}`}
                                value={modeNotEdit[index]}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={onSubmitOrUpdateRow}
                                autoFocus
                            />
                        </li>)
                    ) : (modeNotEdit.map((item, index) => (
                        <li key={index} className={`${style.row__text}`}>
                            <span onDoubleClick={() => setIsEditingAll(true)}>{item}</span>
                        </li>))
                    )}
                </ul>
            </div>

        </div>
    );
};