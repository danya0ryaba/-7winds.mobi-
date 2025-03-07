import { useDeleteRowMutation } from '../../store/API/rowsApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { newRow } from '../../store/reducers/useRows';
import { CurrentRowType } from '../../types/types';
import { Row } from '../Row/Row';

import style from './Table.module.scss';

export const Table: React.FC = () => {

    // const dispatch = useAppDispatch()

    const { rows } = useAppSelector(state => state.rowsReducer)
    // console.log(rows);
    // function for API
    const [deleteRowApi] = useDeleteRowMutation()
    const deleteRow = (id: number) => {
        deleteRowApi(id);
    }

    // const createNewRow = (parentId: number) => {

    //     console.log('Создание нового Row для родителя с id: ' + parentId);
    //     const newChildRow: CurrentRowType = {
    //         child: [],
    //         equipmentCosts: 0,
    //         estimatedProfit: 0,
    //         id: Date.now(), // Используйте уникальный идентификатор
    //         machineOperatorSalary: 0,
    //         mainCosts: 0,
    //         materials: 0,
    //         mimExploitation: 0,
    //         overheads: 0,
    //         rowName: '',
    //         salary: 0,
    //         supportCosts: 0,
    //         total: 0,
    //     };
    //     dispatch(newRow({ parentId, newChildRow }));

    // }


    const renderRows = (rows: CurrentRowType[], paddingLeft: number = 0, isFirst: boolean = true) => {
        return rows.map((row, index) => {
            const isFirstRow = isFirst && index === 0;
            return (<span key={row.id + index}>
                <Row
                    {...row}
                    // createNewRow={createNewRow}
                    deleteRow={() => deleteRow(row.id)}
                    isFirstRow={isFirstRow}
                    paddingLeft={paddingLeft}
                />
                {
                    row.child && row.child.length > 0
                    &&
                    renderRows(row.child as CurrentRowType[], paddingLeft + 20, false)
                }
            </span>)
        });
    };

    return (
        <div className={style.table}>
            {renderRows(rows)}
        </div>
    );
}

// ФУНКЦИИ ДЛЯ РАБОТЫ С API ВЫНЕСТИ СЮДА, ЧТОБЫ НЕ СОЗДАВАТЬ КАЖДЫЙ РАЗ