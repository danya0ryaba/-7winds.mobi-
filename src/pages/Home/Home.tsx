import { Table } from '../../components/Table/Table'

import style from './Home.module.scss'

const rows = [0, 1, 2, 2, 3]
const table_title = ['Основная з/п', 'Оборудование', 'Накладные расходы', 'Сметная прибыль']
// const rows = [0]

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
                            {table_title.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                </div>
                <Table values={rows} />
            </div>


        </main>
    )
}
