import { Row } from '../Row/Row';
import style from './Table.module.scss';

export const Table = () => {
    return (
        <div className={style.table}>
            <Row level={0} />
            <Row level={1} />
            <Row level={2} />
            <Row level={2} />
        </div>
    )
}
