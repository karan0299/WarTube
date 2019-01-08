import React, { Component } from 'react';
import { ScrollView, StyleSheet,Text, View, TouchableOpacity, Linking,  Dimensions,
    processColor ,ImageBackground} from 'react-native';
import { Card } from './common';
import Content from './Content';
import { YoutubeDataAPI } from 'youtube-v3-api';
import {BarChart} from 'react-native-charts-wrapper';
var i=0; dif=0; lead='';
class Stats extends Component {
    state = { tseriesCount:'', pewdiepieCount:'', tsImage:'', pdImage:'' , tsLink: 'https://www.youtube.com/user/tseries', pdLink:'https://www.youtube.com/user/PewDiePie',
   
    bar: {
        title: 'Sales motor in Indonesia',
        detail: { 
          time_value_list: ['current'],
          legend_list: ['Honda', 'Yamaha'],
          dataset: {
            Honda: {
             'current':''
            },
            Yamaha: {
              'current':''
            }
          }
        }
      }};

    componentDidMount() {
        const API_KEY = 'AIzaSyD6yFuuG5fSHuV6rlo53c8T51Ipchn_Wz4';
        const api = new YoutubeDataAPI(API_KEY);
      api.searchChannel( "UCq-Fj5jknLsUf-MWSy4_brA").then((data) => {this.setState({tseriesCount:data.items[0].statistics.subscriberCount , tsImage:data.items[0].snippet.thumbnails.default.url });this.setState({bar: {
        title: 'Sales motor in Indonesia',
        detail: { 
          time_value_list: ['current'],
          legend_list: ['TSeries', 'PewDiePie'],
          dataset: {
            TSeries: {
             'current':Number(this.state.tseriesCount)
            },
            PewDiePie: {
              'current':Number(this.state.pewdiepieCount)
            }
          }
        }
      }})});
      api.searchChannel("UC-lHJZR3Gqxm24_Vd_AJ5Yw").then((response) => {this.setState({pewdiepieCount:response.items[0].statistics.subscriberCount , pdImage:response.items[0].snippet.thumbnails.default.url});
      this.setState({bar: {
        title: 'Sales motor in Indonesia',
        detail: { 
          time_value_list: ['current'],
          legend_list: ['TSeries', 'PewDiePie'],
          dataset: {
            TSeries: {
             'current':Number(this.state.tseriesCount)
            },
            PewDiePie: {
              'current':Number(this.state.pewdiepieCount)
            }
          }
        }
      }})});
      }

      componentWillUpdate(){
        const API_KEY = 'AIzaSyD6yFuuG5fSHuV6rlo53c8T51Ipchn_Wz4';
        const api = new YoutubeDataAPI(API_KEY);
      api.searchChannel( "UCq-Fj5jknLsUf-MWSy4_brA").then((data) => {this.setState({tseriesCount:data.items[0].statistics.subscriberCount , tsImage:data.items[0].snippet.thumbnails.default.url })});
      api.searchChannel("UC-lHJZR3Gqxm24_Vd_AJ5Yw").then((response) => {this.setState({pewdiepieCount:response.items[0].statistics.subscriberCount , pdImage:response.items[0].snippet.thumbnails.default.url})});
       i=0;
       dif=Number(this.state.pewdiepieCount)-Number(this.state.tseriesCount);
       if(dif<0)
       {
         dif=-dif;
         lead="T-Series"
       }
       else
       {
         lead='PewDiePie'
       }
      }

      getRandomColor () {
        var letters = '0123456789ABCDEF'
        var color='#7FFFD4';
        if(i==0)
        {
          color='#FF8C00'
          i=(i+1)%2
      }
     

        return color
      }

      

      renderBar () {
        const style1 = {
          barWidth: 0.1,
          groupSpace: 0.2
        }
        const style2 = {
          barWidth: 0.2,
          groupSpace: 0.1
        }
        const style3 = {
          barWidth: 0.3,
          groupSpace: 0.2
        }
    
        const time = this.state.bar.detail.time_value_list
        const legend = this.state.bar.detail.legend_list
        const dataset = this.state.bar.detail.dataset
    
        var dataSetsValue = []
        var dataStyle = {}
        var legendStyle = {}
        var xAxisStyle = {}
        var chooseStyle = {}
        var yAxisStyle={}
    
        if (legend.length === 4) {
          chooseStyle = style1
        } else if (legend.length === 3) {
          chooseStyle = style2
        } else if (legend.length === 2) {
          chooseStyle = style3
        }
    
        legend.map((legendValue) => {
          var valueLegend = []
    
          time.map((timeValue) => {
            const datasetValue = dataset[legendValue]
            const datasetTimeValue = datasetValue[timeValue]
    
            valueLegend.push(parseInt(datasetTimeValue))
          })
    
          const datasetObject = {
            values: valueLegend,
            label: legendValue,
            config: {
              drawValues: false,
              colors: [processColor(this.getRandomColor())]
            }
          }
          dataSetsValue.push(datasetObject)
        })
    
        legendStyle = {
          enabled: true,
          textSize: 14,
          form: 'SQUARE',
          formSize: 14,
          xEntrySpace: 10,
          yEntrySpace: 50,
          wordWrapEnabled: true
        }
        dataStyle = {
          dataSets: dataSetsValue,
          config: {
            barWidth: chooseStyle.barWidth, // 0.1
            group: {
              fromX: 0,
              groupSpace: chooseStyle.groupSpace, // 0.2
              barSpace: 0.1
            }
          }
        }
        xAxisStyle = {
          valueFormatter: time,
          granularityEnabled: true,
          granularity: 1,
          axisMaximum: 1,
          axisMinimum: 0,
          centerAxisLabels: true
        },
        yAxisStyle ={
            axisMinimum:100000,
        }
    
        return (
          <BarChart
            style={styles.bar}
            xAxis={xAxisStyle}
            yAxis={yAxisStyle}
            chartDescription={{ text: '' }}
            data={dataStyle}
            legend={legendStyle}
            drawValueAboveBar={false}
          />
        )
      }



       


   
    render() {
        const {tseriesCount, pewdiepieCount, tsImage, pdImage, tsLink, pdLink} = this.state;
        return (
            <ScrollView > 
              <ImageBackground source={require('./backg4.png')} style={{width: '100%', height: '100%'}}>
            <View style={{ height:100, flexDirection : 'row', alignItems:'center',justifyContent: "center" }}>
            <Text style={{fontSize: 30}}>War </Text>
            <Text style={{backgroundColor :'red', color:'white', borderRadius: 15, borderBottomStartRadius: 5 , fontSize: 30}}>Tube</Text>
            </View>
        
           <TouchableOpacity onPress={() => Linking.openURL(tsLink)}>
            <Card >
            <Content 
            prop={tseriesCount}
            image={tsImage}
            name={'T-Series'} 
            styles={{height: 100 , width: 100 , marginLeft:-10, borderRadius: 10 }}/>
            </Card >
            </TouchableOpacity>
            <View style={{ height:10}}></View>
            <TouchableOpacity onPress={() => Linking.openURL(pdLink)}>
            <Card >
            
                <Content 
                prop={pewdiepieCount}      
                image={pdImage}
                name={'PewDiePie'}
                styles={{height: 80 , width: 70 ,marginLeft: 10, marginTop: 5 , marginBottom: 5, marginRight: 15, borderRadius: 2 }} />  
               
            </Card>
            <Card>
              <View style={{ height:50, flexDirection : 'row', alignItems:'center',justifyContent: "center", flexWrap:'wrap'}}>
              <Text style={{ fontFamily:'times-new-roman' , color:'#FF4500', fontSize: 18, fontWeight:'bold', fontStyle:'italic'}}>{lead}</Text> 
              <Text style={{ fontSize: 18}}> is ahead by </Text> 
              <Text style={{ fontFamily:'times-new-roman' , color:'#FF4500', fontSize: 18, fontWeight:'bold', fontStyle:'italic'}}>{dif}</Text>
              <Text style={{ fontSize: 18}}> number of subscribers </Text>
              </View>
            </Card>
            </TouchableOpacity>
            <View style={{marginTop: 20}}>
            {this.renderBar()}
        </View>
        </ImageBackground>
        </ScrollView>
       );
    }
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    title: {
      marginTop: 10,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    bar: {
      marginTop: 10,
      height: Dimensions.get('window').height / 2,
      width: Dimensions.get('window').width,
      padding: 10
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

export default Stats;