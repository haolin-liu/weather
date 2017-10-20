/**
 * Day 2
 * A weather app
 * Have trouble completing the animation part
 * will stcdy on the animation in later experiments
 */
'use strict';

import React,{ Component} from 'react';
import { Platform,Image,ScrollView,StatusBar,StyleSheet,Text,TouchableHighlight,View, ImageBackground, TextInput, Button } from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';

class Weather extends Component{
  // static propTypes = {
  //   back: React.PropTypes.func.isRequired,
  // };

  constructor(props) {
    super(props)
    this.state = {
      source:null,
      address: true,
      connent:'suzhou',
      name:'',
      single:[],
      city:[],
      repeat:false,
    }
  }
  componentDidMount(){
    fetch('http://api.worldweatheronline.com/premium/v1/ski.ashx?key=655eff07d0b74329a9f31110171610&q=' + this.state.connent + '&format=json')
      .then((response)=>response.json())
      .then((json)=>{
        this.setState({
          single:this.state.single.concat({
            name:this.state.connent,
          }),
          city:this.state.city.concat({
          source:json,
        })
        });
      })
      // .catch((e)=>{
      //       alert(e);
      //   });
      .done();
  }

   change () {
      const ull = 'http://api.worldweatheronline.com/premium/v1/ski.ashx?key=655eff07d0b74329a9f31110171610&q=' + this.state.connent + '&format=json'
      fetch(ull)
      .then((response)=>response.json())
      .then((json)=>{
        if (!json.data.error) {
          if (!this.state.repeat) {
              this.setState({
                single:this.state.single.concat({
                  name:this.state.connent,
                }),
                city:this.state.city.concat({
                  source:json,
                })
              })}
              else{
                alert("该地天气已存在")
              }
            } else {
            alert("请输入正确的地名")
        }
      })
      // .catch((e)=>{
      //       alert(e);
      //   });
      .done();
   }

  render() {
  for (var i = this.state.single.length - 1; i >= 0; i--) {
    if (this.state.single[i].name == this.state.connent) {
      this.setState({
        repeat:true,
      })
    }
  }
    const slids = this.state.city.length == 0 ? <Text>人生如梦</Text> : this.state.city.map((cityElem, cityIndex) => {
      const weather = cityElem.source.data.request.map((weatherElem, weatherIndex) => {
          return (
            <View key={weatherIndex}>
              <View>
                <Text>地理位置：{weatherElem.query}</Text>
              </View>
            </View>
          ); 
      });
       const tempC = cityElem.source.data.weather.map((tempElem, tempIndex) =>{
        const dateT = tempElem.date;
        const sunshine = tempElem.chanceofsunshine;
        const astron = tempElem.astronomy.map((astronElem, astronIndex) => {
              return(
                  <View key={astronIndex}>
                  <Text>日出：{astronElem.sunrise}</Text>
                  <Text>日落：{astronElem.sunset}</Text>
                  </View>
                )
        })///
        const mm = tempElem.bottom.map((mmElem, mmIndex) => {
          return(
            <View key={mmIndex}>
              <Text>最高气温{mmElem.maxtempC}°</Text>
              <Text>最低气温{mmElem.mintempC}°</Text>
            </View>
            )
        })///
        const hourly = tempElem.hourly.map((hourlyElem, hourlyIndex) => {
             const top = hourlyElem.top.map((topElem, topIndex) => {
                return(
                  <View key={topIndex}>
                      <Text>{hourlyIndex + hourlyIndex * 2 }时 </Text>
                      <Text>{topElem.tempC < 10 ? "0" + topElem.tempC : topElem.tempC}°  </Text>
                      <Text>{topElem.winddir16Point}</Text>
                      <Text>{topElem.windspeedKmph}Km/h</Text>
                  </View>
                )
              });
              const mid = hourlyElem.mid.map((midElem, midIndex) => {
                return(
                  <View key={midIndex}>
                      <Text>{hourlyIndex + hourlyIndex * 2 + 1}时</Text>
                      <Text>{midElem.tempC < 10 ? "0" + midElem.tempC : midElem.tempC}°  </Text>
                      <Text>{midElem.winddir16Point}</Text>
                      <Text>{midElem.windspeedKmph}Km/h</Text>
                  </View>
                )
              });
              const bottom = hourlyElem.bottom.map((bottomElem, bottomIndex) => {
                return(
                  <View key={bottomIndex}>
                      <Text>{hourlyIndex + hourlyIndex * 2 + 2}时</Text>
                      <Text>{bottomElem.tempC < 10 ? "0" + bottomElem.tempC : bottomElem.tempC}°  </Text>
                      <Text>{bottomElem.winddir16Point}</Text>
                      <Text>{bottomElem.windspeedKmph}Km/h</Text>
                  </View>
                )
              });

        return(
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.withinDayHoursContainer} key={hourlyIndex}>
            {top}{mid}{bottom}
          </ScrollView>
        )
      });
///
      return(
        <View key={tempIndex}>
          <Text>日期：{dateT}</Text>
              <View>
                 <ScrollView horizontal={true}>
                 <View style={{flex:1}}>
                   <Text>时间：</Text>
                   <Text>温度：</Text>
                   <Text>风向：</Text>
                   <Text>风速：</Text>
                 </View>
                     {hourly}
                 </ScrollView>
              </View>
          {astron}
          {mm}
        </View>
      )
    });
    return(
    <View key={cityIndex}>
      <Text>Index:{cityIndex}</Text>
      {weather}
      {tempC}
    </View>
    )
  })
///
    return(
        <ScrollView >
              <Text>输入地名：</Text>
          <View>
            <TextInput value={this.state.connent} onChangeText={(connent) => this.setState({connent})} />
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <TouchableHighlight  onPress={this.change.bind(this)}><Text style={{color: "blue"}}>查询</Text></TouchableHighlight>
            </View>
          </View>


          <View style={{width:Util.size.width, height:Util.size.height}}>
           <Swiper 
              showsButtons={false}
              paginationStyle={{bottom:10, paddingTop:10, borderTopColor:"rgba(255,255,255,0.7)",borderTopWidth:Util.pixel}}
              dot={<View style={{backgroundColor: 'rgba(255,255,255,0.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
              activeDot={<View style={{backgroundColor: 'rgba(255,255,255,0.5)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
                  {slids}
          </Swiper>
          </View>
        </ScrollView>
    )
  }
}
///
export default class extends Component{
   constructor () {
    super()
    this.state = {
      address: ''
    }
  }
   static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.hard}`,
  });
  render() {
    // const { params } = this.props.navigation.state;
    return(
      <View >
        <Weather></Weather>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageContainer:{
    backgroundColor:"transparent",
    position: "absolute",
    width: Util.size.width,
    left:0,
    top: 20,
    height: Util.size.height - 53
  },
  headInfo:{
    paddingTop:70,
    alignItems:"center",
    paddingBottom:60,
  },
  city:{
    fontSize: 25,
    color:"#fff",
    paddingBottom: 5,
    backgroundColor:"transparent"
  },
  abs:{
    fontSize:15,
    color:"#fff",
    backgroundColor:"transparent"
  },
  degree:{
    fontSize:85,
    color:"#fff",
    fontWeight: "100",
  },
  circle:{
    fontSize:35,
    color:"#fff",
    fontWeight: "300",
    position:"absolute",
    top:130,
    right:Util.size.width/2-55,
  },
  withinDayGeneral:{
    flexDirection:"row",
    width: Util.size.width,
  },
  withinDayHead:{
    flex:1,
    flexDirection:"row",
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  withinDayTail:{
    flex:1,
    flexDirection:"row",
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  withinDayWeek:{
    fontSize:15,
    color: "#fff",
    fontWeight: "400",
    width:50,
  },
  withinDayDay:{
    fontSize:15,
    color: "#fff",
    fontWeight: "300",
    width:50,
  },
  withinDayHigh:{
    fontSize:16,
    color: "#fff",
    fontWeight: "200",
    width:30,
  },
  withinDayLow:{
    fontSize:16,
    color: "#eee",
    fontWeight: "200",
    width:30,
  },
  withinDayLowNight:{
    fontSize:16,
    color: "#aaa",
    fontWeight: "200",
    width:30,
  },
  withinDayHoursBox:{
    width:55,
  },
  withinDayHoursContainer:{
    marginTop:3,
    borderTopColor:"rgba(255,255,255,0.7)",borderTopWidth:Util.pixel,
    borderBottomColor:"rgba(255,255,255,0.7)",borderBottomWidth:Util.pixel
  },
  withinDayHours:{
    paddingLeft:7,paddingTop:10,paddingBottom:10,paddingRight:10,
    flexDirection:"row",
    flexWrap:"nowrap"
  },
  withinDayHoursTime:{
    color:"#fff",
    fontSize:12,
    textAlign:"center"
  },
  withinDayHoursTimeBold:{
    color:"#fff",
    fontSize:13,
    textAlign:"center",   
    fontWeight:"500",
  },
  withinDayHoursIcon:{
    textAlign:"center",
    paddingTop:5,
  },
  withinDayHoursDegree:{
    color:"#fff",
    fontSize:14,
    paddingTop:5,
    textAlign:"center"
  },
  withinDayHoursDegreeBold:{
    color:"#fff",
    fontSize:15,
    textAlign:"center",
    paddingTop:5,
    fontWeight:"500"
  },
  withinWeek:{
    paddingTop:5
  },
  withinWeekLine:{
    flexDirection:"row",
    height: 28
  },
  withinWeekDay:{
    justifyContent:"center",
    alignItems:"flex-start",
    flex:1,
  },
  withinWeekIcon:{
    justifyContent:"center",
    alignItems:"center",
    flex:1, 
  },
  withinWeekDegree:{
    justifyContent:"flex-end",
    alignItems:"center",
    flex:1,
    flexDirection:"row",
    paddingRight:25,
  },
  withinWeekHigh:{
    color:"#fff",
    width:35,
    fontSize:16,
    textAlign:"right"
  },
  withinWeekIconIcon:{
    color:"#fff"
  },
  withinWeekLow:{
    color:"#eee",
    width:35,
    fontSize:16,
    textAlign:"right"
  },
  withinWeekLowNight:{
    color:"#aaa",
    width:35,
    fontSize:16,
    textAlign:"right"
  },
  withinWeekDayText:{
    color:"#fff",
    paddingLeft:20,
    fontSize:15,
  },
  weatherInfo:{
    marginTop:5,
    borderTopColor:"rgba(255,255,255,0.7)", borderTopWidth:Util.pixel,
    borderBottomColor:"rgba(255,255,255,0.7)", borderBottomWidth:Util.pixel
  },
  weatherInfoText:{
    color:"#fff",
    fontSize:15,
    paddingTop:10,paddingLeft:20,paddingBottom:10,paddingRight:20,
  },
  weatherOther:{
    paddingTop:10
  },
  weatherOtherSection:{
    paddingBottom:10
  },
  weatherOtherLine:{
    flexDirection:"row",
    flexWrap:"nowrap"
  },
  weatherOtherTitle:{
    width: Util.size.width/2-15,
    color:"#fff",
    textAlign:"right",
    fontSize: 15,
  },
  weatherOtherValue:{
    width: Util.size.width/2,
    paddingLeft:15,
    flex:1,
    fontSize: 15,
    color:"#fff",
  },
  backBtn:{
    position:"absolute", 
    right:20,bottom:7
  },
  backBtnIcon:{
    width:50,
    height:50,
    color:"red"
  },
})
