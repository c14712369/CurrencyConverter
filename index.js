// API URL 和金鑰
const API_KEY = "add0b4611b59acffc452fc25";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

// DOM 元素選擇
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertButton = document.getElementById("convert");
const resultDiv = document.getElementById("result");

// 幣值與國家對應表
const currencyCountryMap = {
    AED: "阿聯酋 - 阿聯酋迪拉姆",
    ALL: "阿爾巴尼亞 - 阿爾巴尼亞列克",
    AMD: "亞美尼亞 - 亞美尼亞德拉姆",
    ARS: "阿根廷 - 阿根廷比索",
    AUD: "澳大利亞 - 澳元",
    BAM: "波士尼亞與赫塞哥維納 - 可兌換馬克",
    BDT: "孟加拉 - 孟加拉塔卡",
    BHD: "巴林 - 巴林第納爾",
    BND: "汶萊 - 汶萊元",
    BOB: "玻利維亞 - 玻利維亞諾",
    BRL: "巴西 - 巴西雷亞爾",
    BTN: "不丹 - 紐爾特魯姆",
    BWP: "波札那 - 波札那普拉",
    CAD: "加拿大 - 加元",
    CHF: "瑞士 - 瑞士法郎",
    CLP: "智利 - 智利比索",
    CNY: "中國 - 人民幣",
    COP: "哥倫比亞 - 哥倫比亞比索",
    CZK: "捷克 - 捷克克朗",
    DKK: "丹麥 - 丹麥克朗",
    DOP: "多明尼加 - 多明尼加披索",
    EGP: "埃及 - 埃及鎊",
    ETB: "埃塞俄比亞 - 埃塞俄比亞比爾",
    EUR: "歐元區 - 歐元",
    GBP: "英國 - 英鎊",
    GEL: "喬治亞 - 喬治亞拉里",
    GHS: "加納 - 加納塞地",
    HKD: "香港 - 港元",
    HNL: "宏都拉斯 - 宏都拉斯倫皮拉",
    HRK: "克羅地亞 - 克羅埃西亞庫納",
    HUF: "匈牙利 - 匈牙利福林",
    IDR: "印尼 - 印尼盾",
    ILS: "以色列 - 新謝克爾",
    INR: "印度 - 印度盧比",
    ISK: "冰島 - 冰島克朗",
    JOD: "約旦 - 約旦第納爾",
    JPY: "日本 - 日圓",
    KES: "肯亞 - 肯尼亞先令",
    KHR: "柬埔寨 - 瑞爾",
    KRW: "韓國 - 韓元",
    KWD: "科威特 - 科威特第納爾",
    KZT: "哈薩克 - 坦吉",
    LBP: "黎巴嫩 - 黎巴嫩鎊",
    LKR: "斯里蘭卡 - 斯里蘭卡盧比",
    MAD: "摩洛哥 - 摩洛哥迪拉姆",
    MMK: "緬甸 - 緬甸元",
    MOP: "澳門 - 澳門元",
    MUR: "模里西斯 - 模里西斯盧比",
    MVR: "馬爾地夫 - 馬爾地夫拉菲亞",
    MWK: "馬拉威 - 馬拉威克瓦查",
    MXN: "墨西哥 - 墨西哥比索",
    MYR: "馬來西亞 - 馬來西亞令吉",
    NAD: "納米比亞 - 納米比亞元",
    NGN: "尼日利亞 - 奈拉",
    NOK: "挪威 - 挪威克朗",
    NPR: "尼泊爾 - 尼泊爾盧比",
    NZD: "新西蘭 - 紐西蘭元",
    OMR: "阿曼 - 阿曼里亞爾",
    PEN: "秘魯 - 新索爾",
    PHP: "菲律賓 - 菲律賓比索",
    PKR: "巴基斯坦 - 巴基斯坦盧比",
    PLN: "波蘭 - 波蘭茲羅提",
    PYG: "巴拉圭 - 巴拉圭瓜拉尼",
    QAR: "卡塔爾 - 卡塔爾里亞爾",
    RSD: "塞爾維亞 - 塞爾維亞第納爾",
    RUB: "俄羅斯 - 俄羅斯盧布",
    SAR: "沙特阿拉伯 - 沙特里亞爾",
    SCR: "塞席爾 - 塞席爾盧比",
    SEK: "瑞典 - 瑞典克朗",
    SGD: "新加坡 - 新加坡元",
    THB: "泰國 - 泰銖",
    TRY: "土耳其 - 土耳其里拉",
    TWD: "台灣 - 新台幣",
    TZS: "坦桑尼亞 - 坦桑尼亞先令",
    UGX: "烏干達 - 烏干達先令",
    USD: "美國 - 美元",
    UAH: "烏克蘭 - 烏克蘭赫里夫納",
    VND: "越南 - 越南盾",
    XAF: "中非 - 非洲金融共同體法郎",
    XOF: "西非 - 非洲金融共同體法郎",
    ZAR: "南非 - 南非蘭特",
    ZMW: "贊比亞 - 贊比亞克瓦查"
};

// 更新貨幣名稱顯示
function updateCurrencyOptions(selectElement) {
    Array.from(selectElement.options).forEach((option) => {
        if (currencyCountryMap[option.value]) {
            option.textContent = `${option.value} - ${currencyCountryMap[option.value]}`;
        }
    });
}

// 匯率轉換邏輯（更新以顯示匯率比）
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = "請輸入有效的金額。";
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`);
        const data = await response.json();
        const rate = data.conversion_rates[to];
        const convertedAmount = (amount * rate).toFixed(2);

        // 顯示匯率比和結果
        document.getElementById("exchangeRate").textContent = `匯率: 1 ${from} = ${rate.toFixed(4)} ${to}`;
        resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error("Error converting currency:", error);
        resultDiv.textContent = "無法完成轉換，請稍後再試。";
    }
}

// 初始化貨幣下拉選單
async function initializeCurrencies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);

        // 只添加 currencyCountryMap 中存在的貨幣
        currencies.forEach((currency) => {
            if (currencyCountryMap[currency]) {
                const optionFrom = document.createElement("option");
                optionFrom.value = currency;
                optionFrom.textContent = `${currency} - ${currencyCountryMap[currency]}`;
                fromCurrency.appendChild(optionFrom);

                const optionTo = document.createElement("option");
                optionTo.value = currency;
                optionTo.textContent = `${currency} - ${currencyCountryMap[currency]}`;
                toCurrency.appendChild(optionTo);
            }
        });

        // 預設選擇 USD 和 TWD（若存在）
        fromCurrency.value = "USD";
        toCurrency.value = "TWD";
    } catch (error) {
        console.error("Error fetching currencies:", error);
    }
}

// 初始化
initializeCurrencies();

// 綁定按鈕事件
convertButton.addEventListener("click", convertCurrency);