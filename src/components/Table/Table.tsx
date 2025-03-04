import { Row } from '../Row/Row';
import style from './Table.module.scss';

type TableType = {
    values: number[]
}

export const Table: React.FC<TableType> = ({
    values
}) => {
    return (
        <div className={style.table}>
            {values.map((item, index) => <Row
                key={index}
                level={item}
            />)}
        </div>
    )
}