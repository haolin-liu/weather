import React,{Component} from 'react';
import {  
    AppRegistry,  
    Text,  
    Button,  
    View,  
} from 'react-native';  

export default class MinePage  extends Component {  
    render() {  
        return(  
            <View style={{flex:1}}>  
                <Text onPress={this._skip.bind(this)}>返回上一界面</Text>  
            </View>  
        );  
    }  
  
    _skip() {  
        this.props.navigation.goBack();  
    }  
}
