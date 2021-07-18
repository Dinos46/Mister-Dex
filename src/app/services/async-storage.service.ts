import { Filter } from "../models/filter";

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    makeId
}

interface Entity {
    id?: number
    name?: string
}

async function query(entityType: string, filterBy: Filter = null, delay = 500): Promise<Entity[]> {
    var entities = JSON.parse(localStorage.getItem(entityType) || 'null') || []

    if (delay) {
        const filter = {
            name: filterBy?.name || '',
            type: filterBy?.type || ''
        }

        const regex = new RegExp(filter.name, "i");
        const filteredEntities = entities.filter((ent: any) => {
            return regex.test(ent.name) && ent.types[0]?.type?.name.includes(filter.type)
        })
        return new Promise((resolve) => setTimeout(resolve, delay, filteredEntities))
    }
    return await entities
}

async function get(entityType: string, entityName: string): Promise<Entity> {
    const entities = await query(entityType)
    const entity = entities.find(entity => entity.name === entityName)
    if (!entity) throw new Error(`Cannot get, Item ${entityName} of type: ${entityType} does not exist`)
    return entity;
}

async function post(entityType: string, newEntity: any): Promise<Entity> {
    newEntity = { ...newEntity, id: makeId() }
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
}

async function put(entityType: string, updatedEntity: any): Promise<Entity> {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
    entities[idx] = updatedEntity
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType: string, entityId: number):
    Promise<boolean> {
    const entities = await query(entityType)
    console.log('STORAGE', entities)
    const idx = entities.findIndex(entity => entity.id === entityId)
    console.log('STORAGE', idx)
    if (idx !== -1) entities.splice(idx, 1)
    else throw new Error(`Cannot remove, item ${entityId} of type: ${entityType} does not exist`)
    _save(entityType, entities)
    return true;
}

function _save(entityType: string, entities: Entity[]) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}