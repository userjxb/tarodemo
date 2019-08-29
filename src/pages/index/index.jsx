import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import AddQuestion from './addQuestion';
import yes from '../../assets/yes.png';
import no from '../../assets/no.png';
import './index.scss'

// 缓存
function getStore(key) {
  let str = Taro.getStorageSync(key);
  if(!str) {
    return []
  }
  return JSON.parse(str);
}

function setStore(key,obj) {
  let str = obj;
  if(typeof obj === 'object') {
    str = JSON.stringify(obj);
  }
  Taro.setStorageSync(key,str);
}

// let arr = getStore('question').map(item => {
//   return {id: parseInt(Math.random()*10000),...item};
// })

// setStore('question',arr);

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    showQuestionModal: false,
    questionList: getStore('question')
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 弹出提问框
  addQuestion = () => {
    this.setState({
      showQuestionModal: true
    });
  }

  // 关闭提问框
  closeQuestion = () => {
    this.setState({
      showQuestionModal: false
    });
  }

  // 接收填好的问题
  receiveQuestion = (item) => {
    let { questionList } = this.state;
    questionList.push({id: parseInt(Math.random()*10000),...item});
    this.setState({
      questionList
    },() => {
      setStore('question', questionList)
    });
    this.closeQuestion();
  }

  // 投票
  addVote = (item) => {
    let { questionList } = this.state;
    if(item) {
      item.vote = item.vote?item.vote+1:1;  // 投票的处理
    }
    let listArr = questionList.map(questionItem => {
      if(questionItem.id == item.id) {
        questionItem = {...item};
      }
      return questionItem;
    })
    this.setState({
      questionList: listArr
    },() => {
      setStore('question',questionList)
    });
  }

  // 减票
  cutVote = (item) => {
    let { questionList } = this.state;
    if(item) {
      item.vote = item.vote?(item.vote-1>=0?item.vote-1:0):0; // 减票的处理
    }
    let listArr = questionList.map(questionItem => {
      if(questionItem.id == item.id) {
        questionItem = {...item};
      }
      return questionItem;
    })
    this.setState({
      questionList: listArr
    },() => {
      setStore('question',questionList)
    });
  }

  render () {
    let { showQuestionModal,questionList } = this.state;
    let sortList = questionList.sort((a,b) => b.vote - a.vote ); // 排序
    // console.log(sortList);
    return (
      <View className='index'>
        <View className="title">Taro问答实例</View>
        <View className="list-body">
          {
            sortList.map((item,index) => {
              return (
                <View key={item.id} className="list-items">
                  <View className="list-left">
                    <View className="item-title">{item.title}</View>
                    <View className="item-des">{item.des}</View>
                  </View>
                  <View className="list-right">
                    <Image onClick={() => this.addVote(item)} className="img" src={yes} />
                    <Text>{item.vote?item.vote:0}</Text>
                    <Image onClick={() => this.cutVote(item)} className="img" src={no} />
                  </View>
                </View>
              )
            })
          }
        </View>
        {showQuestionModal && <AddQuestion receiveQuestion={this.receiveQuestion} closeQuestion={this.closeQuestion} />}
        <Button onClick={this.addQuestion} className="btn-question">提问</Button>
      </View>
    )
  }
}
