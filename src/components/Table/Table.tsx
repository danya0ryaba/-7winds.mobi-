import { useCreateRowMutation, useDeleteRowMutation } from '../../store/API/rowsApi';
import { useAppSelector } from '../../store/hooks/redux';
import { CurrentRowType, RequestBodyType } from '../../types/types';
import { Row } from '../Row/Row';

import style from './Table.module.scss';

// export const Table: React.FC = () => {

//     const { rows } = useAppSelector(state => state.rowsReducer)

//     const [deleteRowApi] = useDeleteRowMutation()
//     const deleteRow = (id: number) => {
//         deleteRowApi(id);
//     }

//     const renderRows = (rows: CurrentRowType[], paddingLeft: number = 0, isFirst: boolean = true) => {
//         return rows.map((row, index) => {
//             const isFirstRow = isFirst && index === 0;
//             const isNewRow = row.rowName === ''; // Условие, чтобы определить новую строку
//             return (<span key={row.id + index}>
//                 <Row
//                     {...row}
//                     isNewRow={isNewRow}
//                     deleteRow={() => deleteRow(row.id)}
//                     isFirstRow={isFirstRow}
//                     paddingLeft={paddingLeft}
//                 />
//                 {
//                     row.child && row.child.length > 0
//                     &&
//                     renderRows(row.child as CurrentRowType[], paddingLeft + 20, false)
//                 }
//             </span>)
//         });
//     };

//     return (
//         <div className={style.table}>
//             {renderRows(rows)}
//         </div>
//     );
// }

// ФУНКЦИИ ДЛЯ РАБОТЫ С API ВЫНЕСТИ СЮДА, ЧТОБЫ НЕ СОЗДАВАТЬ КАЖДЫЙ РАЗ




export const Table: React.FC = () => {
    const { rows } = useAppSelector(state => state.rowsReducer);

    const [deleteRowApi] = useDeleteRowMutation();
    const deleteRow = (id: number) => {
        deleteRowApi(id);
    }

    const [createRowApi] = useCreateRowMutation();
    const submitNewRow = (body: RequestBodyType) => {
        createRowApi(body);
    }

    const renderRows = (rows: CurrentRowType[], paddingLeft: number = 0, isFirst: boolean = true, isEditingNewRow: boolean = false) => {
        return rows.map((row, index) => {
            const isFirstRow = isFirst && index === 0;
            const isNewRow = row.rowName === ''; // Условие, чтобы определить новую строку
            const isEditing = isNewRow ? true : false; // Устанавливаем, что новая строка в режиме редактирования

            return (
                <span key={row.id + index}>
                    <Row
                        {...row}
                        // isNewRow={isNewRow}
                        deleteRow={() => deleteRow(row.id)}
                        submitNewRow={submitNewRow}
                        isFirstRow={isFirstRow}
                        paddingLeft={paddingLeft}
                        isEditing={isEditing} // Передаем состояние редактирования
                    />
                    {row.child && row.child.length > 0 && renderRows(row.child as CurrentRowType[], paddingLeft + 20, false)}
                </span>
            );
        });
    };

    return (
        <div className={style.table}>
            {renderRows(rows)}
        </div>
    );
}
