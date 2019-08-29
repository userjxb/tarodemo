import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Textarea, Button } from '@tarojs/components';
import Dialog from './dialog';
import './addQuestion.scss';

export default class AddQuestion extends Component {

    state = {
        title: '',
        des: ''
    }

    confim = () => {
        if(this.state.title && this.state.des) {
            this.props.receiveQuestion(this.state);
        }else {
            Taro.showToast({
                title: '标题或描述不能为空！',
                icon: 'none'
            })
        }
        // this.props.confim();
    }

    cancle = () => {
        this.props.closeQuestion();
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    changeDes = (e) => {
        this.setState({
            des: e.target.value
        });
    }

    render() {
        return (
            <Dialog>
                <View className="add-question">
                    <View className="q-body">
                        <Input onInput={this.changeTitle} className="q-title" placeholder="请输入问题标题" />
                        <Textarea onInput={this.changeDes} className="q-des" placeholder="请输入问题描述" />
                        <View className="btn-group">
                            <Button onClick={this.confim} className="q-ok">确定</Button>
                            <Button onClick={this.cancle} className="q-cancle">取消</Button>
                        </View>
                    </View>
                </View>
            </Dialog>
        )
    }

}