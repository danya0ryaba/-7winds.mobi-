// GET ROWS
export type CurrentRowType = {
    child: CurrentRowType[],
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
export type RequestBodyType = Omit<CurrentRowType, 'id' | 'total' | 'child'> & { parentId: number | null }

export type ResponseBodyType = {
    current: CurrentRowType,
    changed: CurrentRowType[]
}

// UPDATE ROW
export type UpdateRequestBodyType = {
    rId: number,
    body: Omit<CurrentRowType, 'id' | 'total' | 'child'>
}