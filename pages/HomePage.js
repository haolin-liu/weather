import React,{Component} from 'react';
import {  
    AppRegistry,  
    Text,  
    Button,  
    TextInput,
    View,  
} from 'react-native';  

export default class HomePage extends Component {  
    render() {  
        return(  
            <View style={{flex:1}}>  
                <Text onPress={this._skip.bind(this)}>点击跳转</Text>  
                <TextInput style={{height: 40}}/>
            </View>  
        );  
    }  
  
    _skip() {  
        this.props.navigation.navigate("Product");  
    }  
}
