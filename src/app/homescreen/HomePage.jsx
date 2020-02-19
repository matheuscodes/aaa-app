const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const BaseLayout = require('app/common/BaseLayout');
const TotalArrowsCard = require('app/homescreen/cards/TotalArrowsCard');
const EventsCard = require('app/homescreen/cards/EventsCard');
const YearOverviewCard = require('app/homescreen/cards/YearOverviewCard');
const ValueDistributionCard = require('app/homescreen/cards/ValueDistributionCard');
const EndDistributionCard = require('app/homescreen/cards/EndDistributionCard');
const SeasonsCard = require('app/homescreen/cards/SeasonsCard');

const HomePage = React.createClass({
  render: function() {
    const t = this.props.t;
    return (
      <BaseLayout
        switcher={this.props.switcher}
        userAgent={this.props.userAgent}
        styleProvider={this.props.styleProvider}
        layoutName="homePage"
        languages={this.props.languages}
        title={t('home:appBarTitle')} >
        <p style={{textAlign:'center'}}>
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200" height="200" viewBox="0 0 1280.000000 1134.000000"
 preserveAspectRatio="xMidYMid meet" style={{padding:30}}>
<g transform="translate(0.000000,1134.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M6285 11325 c-159 -35 -306 -124 -455 -276 l-95 -97 -1110 -1903
c-610 -1047 -1373 -2356 -1695 -2909 -322 -553 -1114 -1911 -1759 -3018
l-1174 -2013 6 -177 c8 -253 32 -369 108 -528 83 -174 206 -278 430 -365 l102
-40 4141 11 c2278 7 4875 15 5771 18 l1630 7 111 56 c150 76 225 128 314 218
164 166 206 323 180 666 l-12 160 -715 1245 c-394 685 -1260 2192 -1926 3350
-665 1158 -1615 2809 -2109 3670 -495 861 -914 1580 -931 1599 -54 57 -193
165 -275 213 -190 112 -370 150 -537 113z m837 -2722 c638 -1094 1290 -2212
3680 -6306 369 -632 669 -1149 667 -1151 -5 -3 -10093 16 -10097 19 -4 3 5022
8665 5028 8665 3 0 328 -552 722 -1227z"/>
<path d="M5470 7159 c-93 -15 -211 -80 -293 -162 -106 -106 -166 -237 -167
-364 0 -66 27 -180 67 -282 33 -84 42 -97 87 -131 186 -138 385 -186 540 -131
32 11 65 26 72 31 14 13 16 10 44 -59 l20 -53 -27 -21 c-103 -79 -216 -207
-287 -325 l-38 -64 6 -91 c22 -281 78 -620 133 -801 30 -100 36 -78 -55 -213
-66 -96 -161 -291 -195 -398 -39 -123 -66 -261 -73 -382 l-7 -110 -231 -143
c-127 -79 -241 -150 -253 -157 -21 -14 -21 -13 -21 33 1 45 -1 49 -63 105 -76
70 -121 94 -231 122 l-83 22 -6 47 c-4 25 -19 66 -33 90 -40 69 -157 198 -191
213 -52 21 -110 27 -154 15 -39 -10 -46 -8 -118 27 -73 36 -81 38 -172 37 -61
0 -116 -6 -151 -17 l-55 -17 -671 -1222 c-370 -673 -671 -1224 -669 -1226 1
-1 701 1 1555 5 l1553 6 -7 111 c-30 497 -175 1001 -396 1375 -17 30 -30 54
-28 56 2 1 100 59 218 128 l215 126 185 -8 c102 -4 188 -6 192 -4 4 2 30 74
59 161 l52 158 240 127 c132 70 241 126 243 124 1 -1 -30 -79 -71 -172 l-73
-170 -11 -410 c-7 -225 -16 -558 -21 -740 -6 -181 -10 -387 -10 -457 l0 -127
-57 -11 c-173 -34 -329 -95 -402 -156 -31 -26 -52 -58 -65 -102 l-7 -22 532 2
533 3 162 735 c89 404 160 738 158 742 -3 5 -20 8 -38 8 -18 0 -35 2 -37 4 -3
3 -1 53 4 112 l8 107 70 76 c126 138 256 337 422 644 l74 138 6 -123 c12 -239
69 -426 227 -737 l79 -156 168 -174 c261 -271 497 -484 863 -781 190 -153 185
-143 125 -265 -35 -73 -75 -123 -209 -269 -43 -48 -77 -88 -75 -89 2 -2 96 -1
209 2 l205 6 92 70 93 70 210 367 c115 202 210 372 210 376 0 4 -53 21 -119
37 l-118 30 -442 500 c-243 275 -445 501 -450 503 -5 2 -16 -15 -25 -38 -9
-22 -20 -40 -25 -40 -18 0 -120 121 -145 172 -54 112 -86 289 -92 510 -6 253
-50 421 -185 698 l-80 165 48 42 c26 23 51 42 56 43 4 0 12 -11 17 -25 18 -46
49 -50 122 -17 105 47 172 116 214 220 l22 56 -23 47 c-29 56 -87 107 -132
115 -18 3 -33 8 -33 11 0 3 -13 84 -30 181 -82 486 -244 872 -429 1019 -31 24
-130 81 -221 125 l-165 81 -140 -17 c-546 -67 -798 -152 -1046 -353 -65 -52
-109 -67 -125 -42 -4 6 -7 77 -8 158 -1 124 -5 155 -24 210 -28 77 -80 161
-136 219 -104 108 -314 176 -466 151z m2075 -933 c158 -74 269 -318 400 -873
l27 -113 -54 -49 c-29 -27 -54 -48 -54 -48 -7 8 -638 1005 -641 1014 -5 14 81
60 147 79 69 19 120 16 175 -10z m-1382 -1107 c62 -32 230 -206 340 -354 53
-71 97 -134 97 -141 0 -6 -27 -76 -59 -155 l-59 -144 -363 -228 c-200 -125
-372 -232 -382 -238 -17 -9 -18 -7 -11 27 21 115 110 260 258 426 53 59 101
119 106 134 34 89 53 486 31 642 -4 28 -6 52 -4 52 2 0 23 -10 46 -21z"/>
</g></svg></p>
<p style={{textAlign:'center'}}> Im moment, die App befindet sich unter Umbau, ich bitte ein bissen Geduld. </p>
<p style={{textAlign:'center'}}> Saisons, Trainings, Leistungskontrollen und Trainingsberichte sollen normal funktionieren, falls etwas nicht funktioniert, erst mal versuchen auszuloggen und wieder einloggen. </p>
<p style={{textAlign:'center'}}> Wenn das Problem immer noch da ist, bitte sofort melden. </p>
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['home'], HomePage);
