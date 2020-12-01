export interface nodeMetaData {
    children?: nodeMetaData[],
    nodeId: number,
    nodeName: string
}

export interface entity {
    callerId: string,
    nodeStandardMetadata: nodeMetaData
}

export interface Hierarchy {
    status: number,
    entity: entity
}
