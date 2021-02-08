import { getLocalStorage } from './storageUtil';

const members = [
  {
    name: '黄海利'
  },
  {
    name: '黄丽蓉'
  },
  {
    name: '陈超'
  },
  {
    name: '陈亮'
  },
  {
    name: '邹安安'
  },
  {
    name: '陈海燕'
  },
  {
    name: '张晓云'
  },
  {
    name: '李鑫'
  },
  {
    name: '汪安新'
  },
  {
    name: '唐依林'
  },
  {
    name: '李昌杰'
  },
  {
    name: '蔡新如'
  },
  {
    name: '黄刚'
  },
  {
    name: '王智伟'
  },
  {
    name: '吕学雷'
  },
  {
    name: '朱亚东'
  },
  {
    name: '袁龙'
  },
  {
    name: '钱慧芸'
  },
  {
    name: '葛亚洁'
  },
  {
    name: '丁建辉'
  },
  {
    name: '孙岩'
  },
  {
    name: '张宇城'
  },
  {
    name: '林锦涛'
  },
  {
    name: '谢思怡'
  },
  {
    name: '王宁宁'
  },
  {
    name: '刘芳'
  },
  {
    name: '王合磊'
  },
  {
    name: '王爽'
  },
  {
    name: '沈云云'
  },
  {
    name: '张丙岳'
  },
  {
    name: '马忠'
  },
  {
    name: '邵建磊'
  },
  {
    name: '孔爱美'
  },
  {
    name: '王涛'
  },
  {
    name: '李津'
  },
  {
    name: '张伟'
  },
  {
    name: '高田'
  },
  {
    name: '李朗'
  },
  {
    name: '张秀体'
  },
  {
    name: '司旭'
  },
  {
    name: '佘志强'
  },
  {
    name: '许广军'
  },
  {
    name: '段飞'
  },
  {
    name: '陈兵'
  },
  {
    name: '杨涛'
  },
  {
    name: '陶翔'
  },
  {
    name: '丁效红'
  },
  {
    name: '方宁'
  },
  {
    name: '汪根宝'
  },
  {
    name: '高鹏'
  },
  {
    name: '陈乾'
  },
  {
    name: '徐国伟'
  },
  {
    name: '靳小飞'
  },
  {
    name: '刘朝旭'
  },
  {
    name: '聂婉荣'
  },
  {
    name: '蔡如林'
  },
  {
    name: '尚伟'
  },
  {
    name: '衡友海'
  },
  {
    name: '崔伟'
  },
  {
    name: '杨云'
  },
  {
    name: '王张章'
  },
  {
    name: '林南栋'
  },
  {
    name: '张健'
  },
  {
    name: '徐强'
  },
  {
    name: '刘玉林'
  },
  {
    name: '段志昂'
  },
  {
    name: '赵泽晨'
  },
  {
    name: '张军'
  },
  {
    name: '黄传山'
  },
  {
    name: '付莉莉'
  },
  {
    name: '张芬'
  },
  {
    name: '李智'
  },
  {
    name: '庞晓波'
  },
  {
    name: '杨小平'
  },
  {
    name: '韩志杨'
  },
  {
    name: '李涛'
  }
];

function getMember() {
  const addResult = getLocalStorage('member');
  if (addResult && addResult.length) {
    return addResult;
  }
  return members;
}

export default getMember();
