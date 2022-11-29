<template>
  <div class="hero-detail-page" v-if="heroData.name">
    <div class="navbar">
      <span @click="router.push({name: 'home'})">王者荣耀</span>
      <!-- todo: 跳转到英雄列表 -->
      <span style="font-size: 12px;" @click="router.replace({name: 'HeroList'})">更多英雄></span>
    </div>
    <div class="hero-top" @click="showSkinsBanner(true)" :style="{ backgroundImage: 'linear-gradient(transparent 45%, rgb(0 0 0 / 90%)), url('+heroData.backgroundImg+')' }">
      <div class="hero-title">
        <p class="hero-nick-name">{{ heroData.skins[0].name }}</p>
        <p class="hero-name">{{ heroData.name }}</p>
        <p class="hero-type">{{ heroData.category.join(' / ') }}</p>
        <p class="hero-score">
          <span class="diffi">难度<span class="score-num">{{ heroData.scores.difficulty }}</span></span>
          <span class="skill">技能<span class="score-num">{{ heroData.scores.skill }}</span></span>
          <span class="attack">攻击<span class="score-num">{{ heroData.scores.attack }}</span></span>
          <span class="survive">生存<span class="score-num">{{ heroData.scores.survive }}</span></span>
          <!-- todo: 跳到皮肤轮播 -->
          <span class="skins">皮肤: {{ heroData.skins.length }} ></span>
        </p>
      </div>
    </div>
    <div class="hero-info">
      <ul class="info-title">
        <li class="tag"
          v-for="(item, index) in ['英雄初识', '进阶攻略']"
          :key="index"
          :class="{'active': tagActiveIndex === index}"
          @click="tagActiveIndex = index"
        >{{item}}</li>
      </ul>
      <ul class="info-content">
        <li 
          v-for="(i, j) in 2"
          :key="j"
          :class="['info-innerbox', 'info'+i, tagActiveIndex === j ? 'active' : '']"
        >
          <!-- 英雄初识 -->
          <template v-if="i === 1">
            <div class="section1">
              <div class="des-box">
                <div class="btn1" @click="app.proxy.$toast({msg: '暂无该功能!'})">
                  <img src="../assets/vdo.png" alt="">
                  <span>英雄介绍视频</span>
                </div>
                <div class="btn2" @click="showBigPic(true)">
                  <img src="../assets/pic.png" alt="">
                  <span>一图识英雄</span>
                </div>
              </div>
              <ul class="skills-icon-box">
                <li 
                  v-for="(item, index) in heroData.skills"
                  :key="index"
                  :class="['skill-icon', index === skillActiveIndex ? 'active' : '']"
                  @click="skillActiveIndex = index"
                >
                  <img :src="item.icon" alt="">
                </li>
              </ul>
              <ul class="skills-des">
                <li
                  v-for="(item, index) in heroData.skills"
                  :key="index"
                  :class="{active: index === skillActiveIndex}"
                >
                  <div class="name">
                    {{item.name}} <span>{{item.delay}}</span>
                  </div>
                  <div class="desc">{{item.desc}}</div>
                  <div style="
                    margin-top: 0.1rem;
                    line-height: 1.5;
                    font-size: .32rem;
                    color: #33333d;"
                  >{{item.tips}}</div>
                </li>
              </ul>
            </div>
            <div class="section section2">
              <div class="title">加点建议</div>
              <div class="skill-tip">
                <div class="level-up">
                  <div
                    v-for="(item, index) in heroData.levelUp"
                    :key="index"
                  >
                    <p class="skill-title">{{ index === 0 ? '主升' : '副升' }}</p>
                    <img :src="item.icon" alt="">
                    <p class="skill-name">{{item.name}}</p>
                  </div>
                </div>
                <div class="summoner-box">
                  <div class="skill-title">召唤师技能</div>
                  <div class="summoner-innerbox">
                    <div
                      v-for="(item, index) in heroData.summonersId"
                      :key="index"
                    >
                      <img :src="item.img" alt="">
                      <p class="skill-name">{{item.name}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="title">出装推荐</div>
              <div class="equipment-box">
                <div class="equipment-title">顺风出装</div>
                <div class="equipment-list">
                  <div class="equipment-item"
                    v-for="(item, index) in heroData.equipment.downWind"
                    :key="index"
                  >
                    <img :src="item.icon" alt="">
                    <p class="eli">{{item.name}}</p>
                  </div>
                </div>
              </div>
              <div class="equipment-box">
                <div class="equipment-title upWind">逆风出装</div>
                <div class="equipment-list">
                  <div class="equipment-item"
                    v-for="(item, index) in heroData.equipment.upWind"
                    :key="index"
                  >
                    <img :src="item.icon" alt="">
                    <p class="eli">{{item.name}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="section section3">
              <div class="title">铭文推荐</div>
              <div class="inscription-box">
                <div class="inscription-item"
                  v-for="(item, index) in heroData.inscriptionId"
                  :key="index"
                >
                  <img :src="item.img" alt="">
                  <p class="name">{{item.name}}</p>
                  <p 
                    class="desc eli"
                    v-for="(i, j) in item.desc"
                    :key="j"
                  >{{i}}</p>
                </div>
              </div>
            </div>
            <div class="section tips"
              v-for="(item, index) in heroData.tips"
              :key="index"
            >
              <div class="title">{{item.title}}</div>
              <div class="content">
                {{item.content}}
              </div>
            </div>
            <div class="section relations">
              <div class="title">英雄关系</div>
              <div class="relation-item"
                v-for="(item, index) in heroData.relations"
                :key="index"
              >
                <div class="relation-title">{{item.title}}</div>
                <div 
                  class="relation-info"
                  v-for="(item1, index1) in item.relation"
                  :key="index1"
                >
                  <img :src="item1.hero.avatar" alt="">
                  <div class="info-des">{{item1.content}}</div>
                </div>
              </div>
            </div>
          </template>
          <!-- 进阶攻略 -->
          <template v-if="i === 2">
            <div style="padding: .4rem; text-align: center; font-size: .6667rem;">暂无进阶攻略</div>
          </template>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div class="hero-big-pic" v-show="bigPic">
        <img :src="heroData.photo" alt="">
        <span class="close-icon" @click="showBigPic(false)"></span>
      </div>
    </transition>
    <transition name="fade">
      <div class="skins-banner" v-show="skinsBanner">
        <Banner
          :swiperData="heroData.skins"
          :loop="true"
        >
          <template #default="props">
            <div class="img-box">
              <img style="display: block;" :src="props.slideItem.img" alt="" />
              <img style="display: block; transform: rotateX(180deg);" :src="props.slideItem.img" alt="" />
              <div 
                class="page" 
                style="
                  position: absolute;
                  bottom: 8px;
                  right: 8px;
                  color: #fff;
                  font-size: 12px;
                  font-weight: bold;
                "
              >
              {{ props.index + 1 }}/{{ heroData.skins.length }} {{ props.slideItem.name }}
              </div>
            </div>
          </template>
        </Banner>
        <span class="close-icon" @click="showSkinsBanner(false)"></span>
      </div>
    </transition>
  </div>
  <div class="loading-bg loading-skeleton" v-else></div>
</template>
<script lang="ts">
export default {
  name: "HeroDetailExclude",
};
</script>
<script lang="ts" setup>
import resApi from '@/api/resource';

const app: any = getCurrentInstance()
const router = useRouter()
const route = useRoute()
// 英雄详情
const heroData = ref<any>({});
// 是否打开了大图
const bigPic = ref<boolean>(false)
// 是否打开了皮肤轮播
const skinsBanner = ref<boolean>(false)
// '英雄初识', '进阶攻略' 活动标记
const tagActiveIndex = ref<number>(0)
// 选中的技能标记
const skillActiveIndex = ref<number>(0)

// 打开皮肤轮播
const showSkinsBanner = (value: boolean) => {
  skinsBanner.value = value
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}
// 打开一图识英雄
const showBigPic = (value: boolean) => {
  bigPic.value = value
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 如果有顶层, 不要直接离开, 按一次回退键, 先关掉顶层, 再一次才离开页面
onBeforeRouteLeave((to, from) => {
  // if (bigPic.value) {
  //   bigPic.value = false
  //   return false
  // }
  // if (skinsBanner.value) {
  //   skinsBanner.value = false
  //   return false
  // }

  // 如果 val.value true 就取反关掉顶层
  const check = (val: any) => {
    // if (val.value) {
    //   return val.value = false
    // }
    // return true
    return val.value ? (val.value = false) : true
  }

  return check(bigPic) && check(skinsBanner)
})

watch(
  [bigPic, skinsBanner],
  ([bigPicNewV, skinsBannerNewV], [bigPicOldV, skinsBannerOldV]) => {
    if ((!bigPicNewV && bigPicOldV) || (!skinsBannerNewV && skinsBannerOldV)) {
      document.body.style.overflow = ''
    }
  }
)

onMounted(async () => {
  let res = await resApi.getResources(Object.assign({ name: String(route.params.heroName)}, { type: "hero" }));
  heroData.value = res.data;
});

</script>
<style lang="scss" scoped>
$pdt: 1.2rem;
.hero-detail-page {
  height: 100%;
  padding-top: $pdt;
  position: relative;
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $pdt;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2f2f2f;
    padding: 0 0.4rem;
    z-index: 10;
    span {
      font-size: 0.3733rem;
      color: #fff;
    }
  }
  .hero-top {
    min-height: 5.0667rem;
    overflow: hidden;
    font-size: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    .hero-title {
      $delayTime: .3s;
      position: absolute;
      left: .4rem;
      right: .4rem;
      bottom: .4rem;
      font-size: .32rem;
      color: #fff;
      &>p {
        line-height: 1.6;
      }
      .hero-nick-name, .hero-name, .hero-type, .diffi, .skill, .attack, .survive {
        animation: txtshow .6s ease-out;
        animation-fill-mode: both;
      }
      .hero-name {
        font-weight: bold;
        font-size: .4267rem;
        animation-delay: calc($delayTime * 1);
      }
      .hero-type {
        animation-delay: calc($delayTime * 2);
      }
      .hero-score {
        display: flex;
        &>span {
          margin-right: .16rem;
          &>span {
            display: inline-block;
            margin-left: .08rem;
            font-size: .2667rem;
            border-radius: 50%;
            width: .4rem;
            height: .4rem;
            line-height: .4rem;
            text-align: center;
          }
        }
        .diffi {
          animation-delay: calc($delayTime * 3);
          &>span {
            background-color: #805300;
          }
        }
        .skill {
          animation-delay: calc($delayTime * 4);
          &>span {
            background-color: #1f3695;
          }
        }
        .attack {
          animation-delay: calc($delayTime * 5);
          &>span {
            background-color: #791a16;
          }
        }
        .survive {
          animation-delay: calc($delayTime * 6);
          &>span {
            background-color: #33332c;
          }
        }
        .skins {
          margin-left: auto;
          color: #b6afa8;
        }
      }
    }
  }

  .hero-info {
    font-size: .3733rem;
    .info-title {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 .4rem;
      padding: .24rem 0 .16rem;
      border-bottom: .0267rem solid #d4d9de;
      .tag {
        text-align: center;
        border-bottom: .0533rem solid transparent;
        padding: .08rem 0;
        &.active {
          color: #e1a840;
          // border-bottom: .0533rem solid #e1a840;
          border-color: #e1a840;
        }
      }
    }
    .info-content {
      position: relative;
      .info-innerbox {
        padding: .24rem 0;
        display: none;
        &.active {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
        }
      }
      .info1 {
        .section {
          padding: .32rem;
          border-top: .32rem solid #ededed;
          .title {
            font-size: .4267rem;
            font-weight: bold;
            padding-bottom: .4rem;
          }
        }
        .section1 {
          padding: 0 .4rem;
          padding-bottom: .4rem;
          .des-box {
            display: flex;
            justify-content: space-between;
            &>div {
              padding: .24rem 0;
              img {
                width: .5333rem;
                aspect-ratio: 1;
                margin-right: .4rem;
              }
              display: flex;
              align-items: center;
              justify-content: center;
              width: 49%;
              border-radius: .16rem;
              background-color: #fcfcfc;
              border: 1px solid #eceef0;
            }
          }
          .skills-icon-box {
            padding: .64rem 0;
            display: flex;
            &>li {
              flex: 1;
              margin: 0 .32rem;
              border-radius: 50%;
              font-size: 0;
              position: relative;
              border: .1067rem solid transparent;
              max-width: 25%;
              img {
                width: 100%;
                aspect-ratio: 1;
                border-radius: 50%;
              }
              &.active {
                border: .1067rem solid #e1a840;
              }
              // &.active::after {
              //   content: "";
              //   display: block;
              //   position: absolute;
              //   top: -3px;
              //   left: -3px;
              //   right: -3px;
              //   bottom: -3px;
              //   border: 4px solid #e1a840;
              //   border-radius: 50%;
              // }
            }
          }
          .skills-des {
            position: relative;
            &>li {
              // position: absolute;
              // width: 100%;
              // left: 0;
              // top: 0;
              display: none;
              &.active {
                display: block;
              }
              .name {
                display: flex;
                align-items: center;
                font-size: .4267rem;
                font-weight: bold;
                color: #3d3d3d;
                &>span {
                  margin-left: .56rem;
                  color: #b6afa8;
                  font-size: 10px;
                  font-weight: normal;
                }
              }
              .desc {
                font-size: .36rem;
                color: #343440;
                margin-top: .56rem;
                line-height: 1.5;
              }
            }
          }
        }
        .section2 {
          font-size: .32rem;
          .skill-tip {
            display: flex;
            padding-bottom: .56rem;
            .level-up {
              width: 50%;
              display: flex;
              &>div {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                  width: 1.6rem;
                  aspect-ratio: 1;
                  border-radius: 50%;
                }
              }
            }
            .summoner-box {
              flex: 1;
              text-align: center;
              .summoner-innerbox {
                display: flex;
                padding: 0 .48rem;
                &>div {
                  flex: 1;
                  img {
                    width: 1.6rem;
                    aspect-ratio: 1;
                    border-radius: 50%;
                  }
                }
              }
            }
          }
          .skill-title {
            padding-bottom: .48rem;
          }
          .skill-name {
            padding-top: .32rem;
          }
          .equipment-box {
            .equipment-title {
              padding-bottom: .4rem;
              font-size: .3733rem;
              color: #676767;
              &.upWind {
                padding-top: .32rem;
              }
            }
            &:last-child {
              .equipment-list {
                border: none;
              }  
            }
            .equipment-list {
              display: flex;
              justify-content: space-between;
              padding-bottom: .24rem;
              border-bottom: 1px solid #d4d9de;
              .equipment-item {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow: hidden;
                font-size: 0;
                img {
                  border-radius: 50%;
                  width: 1.28rem;
                  aspect-ratio: 1;
                }
                p {
                  padding-top: .24rem;
                  width: 100%;
                  text-align: center;
                  font-size: .32rem;
                }
              }
            }
          }
        }
        .section3 {
          .inscription-box {
            display: flex;
            padding-top: .16rem;
            .inscription-item {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              overflow: hidden;
              p {
                width: 100%;
                text-align: center;
                color: #373737;
              }
              p.name {
                line-height: 1.5;
              }
              p.desc {
                line-height: 1.3;
                font-size: .32rem;
              }
            }
          }
        }
        .tips {
          .content {
            color: #343440;
            font-size: .3733rem;
            line-height: .5333rem;
          }
        }
        .relations {
          .relation-item {
            &:nth-of-type(2) {
              .relation-title {
                padding-top: 0;
              }
            }
            &:last-child {
              border-bottom: none;
              .relation-info:last-child {
                padding-bottom: 0;
              }
            }
            color: #343440;
            border-bottom: 1px solid #d4d9de;
            .relation-title {
              font-size: .4267rem;
              padding-bottom: .32rem;
              padding-top: 0.32rem;
            }
            .relation-info {
              display: flex;
              padding-bottom: .4rem;
              &>img {
                width: 1.28rem;
                height: 1.28rem;
                border-radius: .16rem;
                margin-right: .24rem;
              }
              .info-des {
                flex: 1;
                align-self: center;
                font-size: 13px;
                line-height: 1.4;
              }
            }
          }
        }
      }
      // .info2 { }
    }
  }

  .skins-banner, .hero-big-pic {
    position: fixed;
    width: 100%;
    height: calc(100% - $pdt);
    left: 0;
    top: $pdt;
    overflow: auto;
    font-size: 0;
    background-color: #2f2f2f;
    color: #fff;
    img {
      width: 100%;
    }
    .close-icon {
      position: fixed;
      top: calc($pdt + .4rem);
      right: .4rem;
      background-color: rgba(0, 0, 0, 0.5);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      padding: .16rem;
      box-sizing: content-box;
      z-index: 999;
      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: .08rem;
        height: .4rem;
        background: #fff;
      }
      &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(315deg);
        content: "";
        width: .08rem;
        height: .4rem;
        background: #fff;
      }
    }
  }
}
</style>