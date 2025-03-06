import { useCreateRowMutation, useDeleteRowMutation } from '../../store/API/rowsApi';
import { useAppSelector } from '../../store/hooks/redux';
import { CurrentRowType, RequestBodyType } from '../../types/types';
import { Row } from '../Row/Row';

import style from './Table.module.scss';

type TableType = {
    rowsArray: CurrentRowType[]
}

export const Table: React.FC<TableType> = ({
    rowsArray,
}) => {

    const { rows } = useAppSelector(state => state.rowsReducer)
    console.log('я в Table')
    console.log(rows)
    // function for API
    const [deleteRowApi] = useDeleteRowMutation()
    const deleteRow = (id: number) => {
        alert(`delete row? ID = ${id}`)
        deleteRowApi(id);
    }
    const [createRowApi] = useCreateRowMutation();
    const createRow = (body: RequestBodyType) => {
        createRowApi(body);
    }

    const renderRows = (rows: CurrentRowType[], paddingLeft: number = 0, isFirst: boolean = true) => {
        return rows.map((row, index) => {
            const isFirstRow = isFirst && index === 0;
            return (<span key={row.id}>
                <Row
                    {...row}
                    deleteRow={() => deleteRow(row.id)}
                    // updateRow={() => updateRow({ rId: row.id, body: row })}
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
            {renderRows(rowsArray)}
        </div>
    );
}

// ФУНКЦИИ ДЛЯ РАБОТЫ С API ВЫНЕСТИ СЮДА, ЧТОБЫ НЕ СОЗДАВАТЬ КАЖДЫЙ РАЗ