import { useEffect } from 'react'
import { Table } from '../../components/Table/Table'
import { table_title } from '../../constants/constants'
import { useGetRowsQuery } from '../../store/API/rowsApi'
import { useAppDispatch } from '../../store/hooks/redux'
import { setRows } from '../../store/reducers/useRows'

import style from './Home.module.scss'

export const Home = () => {

    const dispatch = useAppDispatch()

    const { data: rows, isLoading, isError } = useGetRowsQuery();

    useEffect(() => {
        if (!rows) return;
        dispatch(setRows(rows))
    }, [rows, dispatch])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>Error</h1>
    }

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
                <Table />
            </div>
        </main>
    )
}