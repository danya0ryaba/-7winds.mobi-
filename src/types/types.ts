// GET

export type RowType = {
    child: unknown[],
    equipmentCosts: number,
    estimatedProfit: number,
    id: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    rowName: string,
    salary: number,
    supportCosts: number,
    total: number
}

// ПОХОЖИЕ ТИПЫ ЧЕРЕЗ УТИЛИТЫ ЗАПИСАТЬ

// CREATE
export type RequestBodyType = {
    equipmentCosts: number,
    estimatedProfit: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    parentId: number,
    rowName: string,
    salary: number,
    supportCosts: number
}

export type ResponseBodyType = {
    current: {
        id: number,
        rowName: string,
        total: number,
        salary: number,
        mimExploitation: number,
        machineOperatorSalary: number,
        materials: number,
        mainCosts: number,
        supportCosts: number,
        equipmentCosts: number,
        overheads: number,
        estimatedProfit: number
    },
    changed: unknown[]
}