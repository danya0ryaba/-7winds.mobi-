import { RowType } from '../../types/types';
import { Row } from '../Row/Row';
import style from './Table.module.scss';

type TableType = {
    rowsArray: RowType[]
}

export const Table: React.FC<TableType> = ({
    rowsArray,
}) => {
    console.log(rowsArray)

    // const stack = [rowsArray[0].child]

    // while(stack.length>0) {
    //     const item = stack.shift();
    //     if (item) {
    //         rowsArray.push(item)
    //         item.forEach((i) => stack.push(i))
    //     }
    // }

    return (
        <div className={style.table}>
            {rowsArray.map((item) => <Row
                key={item.id}
                {...item}
            />)}
        </div>
    )
}