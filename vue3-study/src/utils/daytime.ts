export function getDayTime(): string {
    const hour = new Date().getHours(); //获取当前小时数
    if (hour >= 6 && hour < 9) {
        return "早上好";                    //6-9点                         
    } else if (hour >= 9 && hour < 12) {
        return "上午好";                    //9-12点                        
    } else if (hour >= 12 && hour < 14) {
        return "中午好";                    //12-14点                       
    } else if (hour >= 14 && hour < 18) {
        return "下午好";                    //14-18点                       
    } else if (hour >= 18 && hour < 22) {
        return "晚上好";                    //18-22点                       
    } else {
        return "夜深了,注意休息";            //22-6点                        
    }           
}