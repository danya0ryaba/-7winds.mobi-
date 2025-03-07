// GET ROWS
export type CurrentRowType = {
    child: CurrentRowType[] | [null],
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
    total: number,
}

// CREATE ROW
export type RequestBodyType = {
    equipmentCosts: number,
    estimatedProfit: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    parentId: number | null,
    rowName: string,
    salary: number,
    supportCosts: number
}

export type ResponseBodyType = {
    current: CurrentRowType,
    changed: CurrentRowType[]
}

// UPDATE ROW
export type UpdateRequestBodyType = {
    rId: number
    body: Omit<CurrentRowType, 'id' | 'total' | 'child'>
}
