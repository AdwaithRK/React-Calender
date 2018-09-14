export function updateDateContext (dateContext) {

      console.log("updating",dateContext);
    return {
        type: 'UPDATE_DATE_CONTEXT',
        payload: dateContext, 

    }
}