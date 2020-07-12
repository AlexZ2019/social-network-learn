export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(user_from_server => {
        if (user_from_server[objPropName] === itemId) {
            return {...user_from_server, ...newObjProps}
        }
        return user_from_server
    })
}
