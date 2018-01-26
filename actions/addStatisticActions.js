import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import * as frameActions from '../actions/frameActions'

export function AddStatistic(statistic, history) {
    return (dispatch, getState) => {
        XHR('addStatistic', statistic, history)
            .then(res => {
                dispatch(frameActions.showSuccessToast('操作成功', 2000))
            })
            .catch(err => {
                dispatch(frameActions.showModal(err.message));//在一个action中触发另一个action,可用于组件之间通信!
            })
    }
}