import { useEffect, useRef, useState } from 'react';
import { Input } from '../Input/Input';
import { CurrentRowType, RequestBodyType, UpdateRequestBodyType } from '../../types/types';
import { newRow } from '../../store/reducers/useRows';
import { useAppDispatch } from '../../store/hooks/redux';

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

    const handleInputChange = (index: number, value: string) => {
        const newModeNotEdit = [...modeNotEdit];
        newModeNotEdit[index] = value;
        setModeNotEdit(newModeNotEdit);
    };

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

    const handleEditDoubleClick = () => setIsEditingAll(true);

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
                                <svg onClick={() => {
                                    if (!isEditingAll) {
                                        createNewRow(id)
                                    };
                                }
                                }
                                    width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.5556 0H1.77778C0.8 0 0 0.8 0 1.77778V14.2222C0 15.2 0.8 16 1.77778 16H14.2222C15.2 16 16 15.2 16 14.2222V4.44444L11.5556 0ZM3.55556 3.55556H8V5.33333H3.55556V3.55556ZM12.4444 12.4444H3.55556V10.6667H12.4444V12.4444ZM12.4444 8.88889H3.55556V7.11111H12.4444V8.88889ZM10.6667 5.33333V1.77778L14.2222 5.33333H10.6667Z" fill="#7890B2" />
                                </svg>
                            </button>
                            {stateSvg && !isEditingAll && <svg onClick={deleteRow} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_3704_303)">
                                    <path d="M2.5 1C2.23478 1 1.98043 1.10536 1.79289 1.29289C1.60536 1.48043 1.5 1.73478 1.5 2V3C1.5 3.26522 1.60536 3.51957 1.79289 3.70711C1.98043 3.89464 2.23478 4 2.5 4H3V13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15H11C11.5304 15 12.0391 14.7893 12.4142 14.4142C12.7893 14.0391 13 13.5304 13 13V4H13.5C13.7652 4 14.0196 3.89464 14.2071 3.70711C14.3946 3.51957 14.5 3.26522 14.5 3V2C14.5 1.73478 14.3946 1.48043 14.2071 1.29289C14.0196 1.10536 13.7652 1 13.5 1H10C10 0.734784 9.89464 0.48043 9.70711 0.292893C9.51957 0.105357 9.26522 0 9 0L7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1H2.5ZM5.5 5C5.63261 5 5.75979 5.05268 5.85355 5.14645C5.94732 5.24021 6 5.36739 6 5.5V12.5C6 12.6326 5.94732 12.7598 5.85355 12.8536C5.75979 12.9473 5.63261 13 5.5 13C5.36739 13 5.24021 12.9473 5.14645 12.8536C5.05268 12.7598 5 12.6326 5 12.5V5.5C5 5.36739 5.05268 5.24021 5.14645 5.14645C5.24021 5.05268 5.36739 5 5.5 5ZM8 5C8.13261 5 8.25979 5.05268 8.35355 5.14645C8.44732 5.24021 8.5 5.36739 8.5 5.5V12.5C8.5 12.6326 8.44732 12.7598 8.35355 12.8536C8.25979 12.9473 8.13261 13 8 13C7.86739 13 7.74021 12.9473 7.64645 12.8536C7.55268 12.7598 7.5 12.6326 7.5 12.5V5.5C7.5 5.36739 7.55268 5.24021 7.64645 5.14645C7.74021 5.05268 7.86739 5 8 5ZM11 5.5V12.5C11 12.6326 10.9473 12.7598 10.8536 12.8536C10.7598 12.9473 10.6326 13 10.5 13C10.3674 13 10.2402 12.9473 10.1464 12.8536C10.0527 12.7598 10 12.6326 10 12.5V5.5C10 5.36739 10.0527 5.24021 10.1464 5.14645C10.2402 5.05268 10.3674 5 10.5 5C10.6326 5 10.7598 5.05268 10.8536 5.14645C10.9473 5.24021 11 5.36739 11 5.5Z" fill="#DF4444" />
                                </g>
                            </svg>}
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
                                className={style.row__input}
                                value={modeNotEdit[index]}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={onSubmitOrUpdateRow}
                                autoFocus
                            />
                        </li>)
                    ) : (modeNotEdit.map((item, index) => (
                        <li key={index} className={style.row__text}>
                            <span onDoubleClick={handleEditDoubleClick}>{item}</span>
                        </li>
                    ))
                    )}
                </ul>
            </div>

        </div>
    );
};