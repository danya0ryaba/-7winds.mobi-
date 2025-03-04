import { Table } from '../../components/Table/Table'
import style from './Home.module.scss'

const rows = [0, 1, 2, 2]
const rows2 = [0, 1, 2, 2]

export const Home = () => {
    return (
        <main>
            <div className={style.home_tab}>
                <h3 className={style.home_tab__title}>Строительно-монтажные работы</h3>
            </div>

            <div className="container">
                <div className={style.table_title}>
                    <div className={style.table_title__item}>
                        <ul>
                            <li className={style.table_title__item_level}>Уровень</li>
                            <li className={style.table_title__item_name}>Наименование работ</li>
                        </ul>
                    </div>
                    <div className={style.table_title__item}>
                        <ul>
                            <li>Основная з/п</li>
                            <li>Оборудование</li>
                            <li>Накладные расходы</li>
                            <li>Сметная прибыль</li>
                        </ul>
                    </div>
                </div>
                <Table values={rows} />
                <Table values={rows2} />
            </div>


        </main>
    )
}
