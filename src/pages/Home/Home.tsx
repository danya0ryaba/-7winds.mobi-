import { Table } from '../../components/Table/Table'
import { table_title } from '../../constants/constants'
import { useGetRowsQuery } from '../../store/API/rowsApi'

import style from './Home.module.scss'

const rows2 = [0, 1, 2, 2]

export const Home = () => {

    const { data: rows, isLoading, isError } = useGetRowsQuery('')
    console.log(rows, isLoading, isError)

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
                <Table values={rows2} />
            </div>
        </main>
    )
}