import trialBlocks from './trialBlocksReducer';

const experimentalLists = (state = [], action) => {
    return state.map((item, index) => {
        if(index !== action.listId){
            return item;
        }
        return trialBlocks(item, action);
    });
};

export default experimentalLists;
