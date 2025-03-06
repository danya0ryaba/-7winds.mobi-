type CurrentRowType = {
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

// GET ROWS
//  УБРАТЬ unknown
export type RowType = { child: unknown[] } & CurrentRowType

// CREATE ROW

export type RequestBodyType = {
    equipmentCosts: number,
    estimatedProfit: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    parentId: number, // not
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
    rId: string
    body: Omit<CurrentRowType, 'id' | 'total'>
}