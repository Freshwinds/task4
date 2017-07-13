/**
 * Created by freshwinds on 17-7-13.
 */

function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}

function Item(barcode,name,unit,count,price,promotion){
    this.barcode=barcode;
    this.name=name;
    this.unit=unit;
    this.count=count;
    this.price=price;
    this.promotion=promotion;
}
function get_Items(items_information,loads_promotion){
    var items=new Array();
    var arr=new Array();
    for(var i=0;i<items_information.length;i++)
    {
        var x=new Array(loads_promotion.barcodes);
        for(var j=0;j<x.length;j++)
        {
            if(items_information[i].barcodes==x[j])
            {
                arr[i]=1;
            }

        }
    }
    for(var i=0;i<items_information.length;i++)
    {
        items[i]=new Item(items_information[i].barcode,items_information[i].name,items_information[i].unit,0,items_information[i].price,arr[i]);
    }
    return items;
}
function cal_itemsum(inputs,items) {
    for(var i=0;i<inputs.length;i++) {
        var loc=inputs[i].indexOf('-');
        //console.log(loc);
        var num=1;
        if(loc==-1)
        {
            str_st=0;
            str_ed=inputs[i].length;
        }
        else
        {
            str_st=0;
            str_ed=loc;
            num=Number(inputs[i].substring(loc+1,inputs[i].length));
        }
        var items_str=inputs[i].substring(str_st,str_ed);
        //console.log(items_str);
        for (var j = 0; j < items.length; j++) {
            if(items_str==items[j].barcode)
            {
                items[j].count+=num;
               // console.log( items[j].count);
            }
        }
    }
}

function cal_sum(items,load_promotions){
    var all_sum=0;
    for(var i=0;i<items.length;i++)
    {
        if(items[i].count>=2&& items[i].promotion==1)
        {
            all_sum+=(items[i].count-1)*items[i].price;
        }
        else
            all_sum+=items[i].count*items[i].price;
    }
    return all_sum;
}
function get_save (items,all_sum) {
    var sum=0;
    for(var i=0;i<items.length;i++)
    {
        sum+=items[i].count*items[i].price;
    }
    return sum-all_sum;
}

function printReceipt(items,all_sum,save_sum, load_promotions) {
    var str="";
    str+="***<没钱赚商店>收据***\n";
    for(var i=0;i<items.length;i++)
    {

        if(items[i].count!=0) {
           str+=`名称：${items[i].name}, 数量：${items[i].count}${items[i].unit}, 单价：${Number(items[i].price).toFixed(2)}(元), 小计：`;
            if(items[i].count<2 || items[i].promotion!=1)
                str += String(Number(items[i].count*items[i].price).toFixed(2) + "(元)\n");
            else
                str += String(Number((items[i].count-1)*items[i].price).toFixed(2) + "(元)\n");
        }
    }
   str+="----------------------\n总计：";
    str+=String(Number(all_sum).toFixed(2)+"(元)\n");
    str+="节省: "+Number(save_sum).toFixed(2)+"(元)\n";
    str+="**********************";
    return str;
}
var items_information=loadAllItems();

var load_promotions=loadPromotions();

var items=get_Items(items_information,load_promotions);
var inputs=
    [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
    ];
cal_itemsum(inputs,items);
var all_sum=cal_sum(items, load_promotions);
var save_sum=get_save(items,all_sum);
console.log(printReceipt(items,all_sum,save_sum, load_promotions));
