import React, {useState, useEffect} from 'react'
import {Picker, View, Text, StyleSheet, TouchableOpacity} from 'react-native'

interface Props{

startYear: number,
startDay: number,
startMonth: number,
yearsBack: number,
onYearValueChange: (year: number,index: number) => (void),
onMonthValueChange: (month: number, index: number) => (void),
onDayValueChange: (day: number, index: number) => (void)

};


const DatePicker: React.FC<Props> = (props) =>{

    const [year, setYear] = useState(1990);
    const [day, setDay] = useState(props.startDay);
    const [month, setMonth] = useState(props.startMonth); 

function getMonths() {
    const months: string[] = []
   for(var i: number = 1; i<=12;i++){
        if(i < 10){
            months.push('0'+i.toString())
       }else{
           months.push(i.toString())
       }

   }
   console.log(months)
    return months;
}    

function getDays(){
    const days: string[] = [];
    for(var i: number = 1; i<=31; i++){
        if(i<10){
            days.push('0'+i.toString());
        }else{
            days.push(i.toString());       
        }

    }
    return days;
}
 
function getYears(){

    const years: string[] = []
    const date = new Date();
    for(var i: number = date.getFullYear()-props.yearsBack; i<=date.getFullYear(); i++ ){
        years.push(i.toString());
    }
    console.log(years)
    return years;
}



function renderYearPickerItems() {


    var currentYear = (new Date()).getFullYear();
 
    var startYear = currentYear - props.yearsBack;
    var endYear = currentYear;

    var years = [];
    for (var i = startYear; i <= endYear; i++) {
      years.push(<Picker.Item label={i.toString()} value={i} key={i} />);
    }
    years.push(<Picker.Item label="----" value={0} key={0} />);
    return years;
  }

  function onYearChange(value: number,index: number): void{
    setYear(value);
    props.onYearValueChange(value,index);



  }

    return(

      <View style = {styles.dayPickerContainer} >

        <Picker style={styles.yearPicker} selectedValue={year} onValueChange={(value,index) => {onYearChange(value,index)}}>
          {renderYearPickerItems()}
        </Picker>

        <TouchableOpacity onPress = {() => getYears()}>

            <Text>MONTH</Text>
        </TouchableOpacity>


      </View>  
    );
    



}


const styles = StyleSheet.create({

    dayPickerContainer:{



    },
    yearPicker:{

    }



});

export default DatePicker;