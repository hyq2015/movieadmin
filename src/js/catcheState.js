let SCROLL_POSITION={
    catcheState:[],
    addCatche:function(pathname,scrollposition){
        let catcheObj={};
        for(let i=0;i<SCROLL_POSITION.catcheState.length;i++){
            if(SCROLL_POSITION.catcheState[i].pathname==pathname){
                SCROLL_POSITION.catcheState[i].scroll=scrollposition
                return
            }
        }
        catcheObj.pathname=pathname;
        catcheObj.scroll=scrollposition;
        SCROLL_POSITION.catcheState.push(catcheObj)
    },
    getCache:function(pathname){
        for(let i=0;i<SCROLL_POSITION.catcheState.length;i++){
            if(SCROLL_POSITION.catcheState[i].pathname==pathname){
                return SCROLL_POSITION.catcheState[i].scroll
            }
        }
        return false
    }
}
export default SCROLL_POSITION