import axios from 'axios';
import {animation} from './animation.js'

export var address1 = 'http://' + (window.location.host).split(':')[0] + ':8080';
export const screenSizes = [1024, 1280, 1920, 2048, 3840, 4096]

export const videoLayers = [1, 2, 3, 10000, 5];
export const templateLayers = { savePannelPlayer: 107, solidCaption1: 108, solidCaption2: 109, solidCaption3: 110, logo: 111, locationBand: 112, verticalScroll: 113, horizontalScroll: 114, clock: 115, countUpTimer: 116, gameTimer: 117 };

export const endpoint = (string) => {
    const data = { string: string }
    axios.post(address1 + '/endpoint', data).then((aa) => {
        //    console.log(aa)
    }).catch((aa) => { console.log('Error', aa) });
}



export const updateGraphics = (canvas, layerNumber) => {
    endpoint(`call ${window.chNumber}-${layerNumber} "
        aa.innerHTML='${(canvas.toSVG()).replaceAll('"', '\\"')}';
        "`)
}

export const stopGraphics = layerNumber => {
    endpoint(`mixer ${window.chNumber}-${layerNumber} fill 0 0 0 1 12 ${window.animationMethod}`)
    setTimeout(() => {
        endpoint(`stop ${window.chNumber}-${layerNumber}`);
        endpoint(`mixer ${window.chNumber}-${layerNumber} clear`);
    }, 1000);
}
export const options = {
    currentMode: "",
    currentColor: "#ffffff",
    currentFont: 'Arial',
    currentFontSize: 25,
    backgroundColor: "#50037c",
    // currentWidth: 5,
    group: {},
    stroke: '#ffffff',
    strokeWidth: 3,
};
export const shadowOptions = {
    color: 'black',
    blur: 30,
    offsetX: 0,
    offsetY: 0,
    affectStroke: false
};
export const changeShadowCurrentColor = (e, canvas) => {
    shadowOptions.color = e.target.value;
    canvas.getActiveObjects().forEach(item => { if (item.shadow) { item.shadow.color = e.target.value } })
    canvas.requestRenderAll();
}
export const changeStrokeCurrentColor = (e, canvas) => {
    options.stroke = e.target.value;
    canvas.freeDrawingBrush.color = e.target.value;
    canvas.getActiveObjects().forEach(item => item.stroke = e.target.value)
    canvas.requestRenderAll();
}
export const changeCurrentColor = (e, canvas) => {
    options.currentColor = e.target.value;
    canvas.getActiveObjects().forEach(item => item.fill = e.target.value)
    canvas.requestRenderAll();
};
export const changeBackGroundColor = (e, canvas) => {
    options.backgroundColor = e.target.value;
    canvas.getActiveObjects().forEach(item => item.backgroundColor = e.target.value)
    canvas.requestRenderAll();
}
export const fontLists = [
    "AADevAksharReg",
    "AADevApsBil",
    "AADevApsReg",
    "AADevChitralekhaReg",
    "AADevIndicaReg",
    "AADevIsfocBil",
    "AADevIsfocReg",
    "AADevKrutiReg",
    "AADevShreeLipiBil",
    "AADevShreeLipiReg",
    "AADevSulipiReg",
    "AADevSushaReg",
    "AADevWinKeyBil",
    "AADevWinKeyReg",
    "AclAksharELight",
    "Agency FB",
    "AkrutiDevAbhijit",
    "AkrutiDevAditi",
    "AkrutiDevAditya",
    "AkrutiDevAjit",
    "AkrutiDevAkanksha",
    "AkrutiDevAkankshaMedium",
    "AkrutiDevAkhila",
    "AkrutiDevAkshardhara",
    "AkrutiDevAkshardharaExtBold",
    "AkrutiDevAkshay",
    "AkrutiDevAnand",
    "AkrutiDevAnil",
    "AkrutiDevAnjali",
    "AkrutiDevArjun",
    "AkrutiDevAshvin",
    "AkrutiDevAsmita",
    "AkrutiDevBela",
    "AkrutiDevBhagya",
    "AkrutiDevBharani",
    "AkrutiDevBharati",
    "AkrutiDevBhaskar",
    "AkrutiDevBrahma",
    "AkrutiDevCactus",
    "AkrutiDevChakra",
    "AkrutiDevChakraNormal",
    "AkrutiDevChampa",
    "AkrutiDevChandrika",
    "AkrutiDevCharu",
    "AkrutiDevDeepa",
    "AkrutiDevGanesh",
    "AkrutiDevHansa",
    "AkrutiDevHarsha",
    "AkrutiDevHarshaMedium",
    "AkrutiDevHema",
    "AkrutiDevIndu",
    "AkrutiDevIshwar",
    "AkrutiDevJanhavi",
    "AkrutiDevKailas",
    "AkrutiDevKailasMedium",
    "AkrutiDevKalidas",
    "AkrutiDevKusum",
    "AkrutiDevMadhura",
    "AkrutiDevMalavika",
    "AkrutiDevMallika",
    "AkrutiDevMandara",
    "AkrutiDevMangal",
    "AkrutiDevManisha",
    "AkrutiDevManoj",
    "AkrutiDevManorama",
    "AkrutiDevMaya",
    "AkrutiDevMayur",
    "AkrutiDevMeera",
    "AkrutiDevMegha",
    "AkrutiDevMenaka",
    "AkrutiDevMitra",
    "AkrutiDevMogara",
    "AkrutiDevMogaraMedium",
    "AkrutiDevMouj",
    "AkrutiDevMoujLight",
    "AkrutiDevMukund",
    "AkrutiDevNandi",
    "AkrutiDevNarmada",
    "AkrutiDevNartaki",
    "AkrutiDevNatraj",
    "AkrutiDevNatrajLight",
    "AkrutiDevNavaneet",
    "AkrutiDevNavin",
    "AkrutiDevNewPriya",
    "AkrutiDevNewPriyaExpand",
    "AkrutiDevNewPriyaNormal",
    "AkrutiDevOmkar",
    "AkrutiDevParimala",
    "AkrutiDevPataliputra",
    "AkrutiDevPayal",
    "AkrutiDevPooja",
    "AkrutiDevPrakash",
    "AkrutiDevPratap",
    "AkrutiDevPratik",
    "AkrutiDevPraveen",
    "AkrutiDevPreeti",
    "AkrutiDevPreetiLight",
    "AkrutiDevPrema",
    "AkrutiDevPriya",
    "AkrutiDevPriyaExpanded",
    "AkrutiDevPriyanka",
    "AkrutiDevPushpa",
    "AkrutiDevRahul",
    "AkrutiDevRaksha",
    "AkrutiDevRakshaExtBold",
    "AkrutiDevRekha",
    "AkrutiDevRishi",
    "AkrutiDevRohini",
    "AkrutiDevRoshan",
    "AkrutiDevSavita",
    "AkrutiDevSeetha",
    "AkrutiDevShantala",
    "AkrutiDevShivaji",
    "AkrutiDevShradda",
    "AkrutiDevShridhar",
    "AkrutiDevShridharLight",
    "AkrutiDevShruti",
    "AkrutiDevSindhu",
    "AkrutiDevSita",
    "AkrutiDevSneha",
    "AkrutiDevSulekh",
    "AkrutiDevSunil",
    "AkrutiDevSushma",
    "AkrutiDevSwati",
    "AkrutiDevTilak",
    "AkrutiDevTriveni",
    "AkrutiDevUpendra",
    "AkrutiDevVaishali",
    "AkrutiDevValmiki",
    "AkrutiDevVandana",
    "AkrutiDevVarsha",
    "AkrutiDevVarun",
    "AkrutiDevVedik",
    "AkrutiDevVichitra",
    "AkrutiDevVidya",
    "AkrutiDevVijay",
    "AkrutiDevVinod",
    "AkrutiDevVivek",
    "AkrutiDevXPYogini",
    "AkrutiDevYamuna",
    "AkrutiDevYogini",
    "AkrutiOfficeAditi",
    "AkrutiOfficeAditi01",
    "AkrutiOfficeAjit",
    "AkrutiOfficeAjit01",
    "AkrutiOfficeAkanksha",
    "AkrutiOfficeAkanksha01",
    "AkrutiOfficeAkansha",
    "AkrutiOfficeAkshardhara",
    "AkrutiOfficeAkshardhara01",
    "AkrutiOfficeAkshay",
    "AkrutiOfficeAkshay01",
    "AkrutiOfficeChakra",
    "AkrutiOfficeChakra01",
    "AkrutiOfficeChampa",
    "AkrutiOfficeChampa01",
    "AkrutiOfficeDeepa",
    "AkrutiOfficeDeepa01",
    "AkrutiOfficeHansa",
    "AkrutiOfficeHansa01",
    "AkrutiOfficeHinPriya",
    "AkrutiOfficeHinPriya01",
    "AkrutiOfficeManorama",
    "AkrutiOfficeManorama01",
    "AkrutiOfficeMogara",
    "AkrutiOfficeMogara01",
    "AkrutiOfficeMouj",
    "AkrutiOfficeMouj01",
    "AkrutiOfficePriya",
    "AkrutiOfficePriya01",
    "AkrutiOfficePriyaExpand",
    "AkrutiOfficePriyaExpand01",
    "AkrutiOfficeShruti",
    "AkrutiOfficeShruti01",
    "AkrutiOfficeSulekh",
    "AkrutiOfficeSulekh01",
    "AkrutiOfficeSwati",
    "AkrutiOfficeSwati01",
    "AkrutiOfficeTriveni",
    "AkrutiOfficeTriveni01",
    "AkrutiOfficeVijay",
    "AkrutiOfficeVijay01",
    "AkrutiOfficeYogini",
    "AkrutiOfficeYogini-S",
    "AkrutiOfficeYogini01",
    "AkrutiOfficeYoginiLight",
    "AkrutiOfficeYoginiLight01",
    "Algerian",
    "Aparajita",
    "Arial",
    "Arial Black",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Arial Unicode MS",
    "Bahnschrift",
    "Bahnschrift Condensed",
    "Bahnschrift Light",
    "Bahnschrift Light",
    "Bahnschrift Light Condensed",
    "Bahnschrift SemiBold",
    "Bahnschrift SemiBold",
    "Bahnschrift SemiBold Condensed",
    "Bahnschrift SemiCondensed",
    "Bahnschrift SemiLight",
    "Bahnschrift SemiLight",
    "Bahnschrift SemiLight",
    "Baskerville Old Face",
    "Bauhaus 93",
    "Bell MT",
    "Berlin Sans FB",
    "Berlin Sans FB Demi",
    "Bernard MT Condensed",
    "Blackadder ITC",
    "Bodoni MT",
    "Bodoni MT Black",
    "Bodoni MT Condensed",
    "Bodoni MT Poster Compressed",
    "Book Antiqua",
    "Bookman Old Style",
    "Bookshelf Symbol 7",
    "Bradley Hand ITC",
    "Britannic Bold",
    "Broadway",
    "Brush Script MT",
    "Calibri",
    "Calibri Light",
    "Californian FB",
    "Calisto MT",
    "Cambria",
    "Cambria Math",
    "Candara",
    "Candara Light",
    "Cascadia Code",
    "Cascadia Code ExtraLight",
    "Cascadia Code Light",
    "Cascadia Code SemiBold",
    "Cascadia Code SemiLight",
    "Cascadia Mono",
    "Cascadia Mono ExtraLight",
    "Cascadia Mono Light",
    "Cascadia Mono SemiBold",
    "Cascadia Mono SemiLight",
    "Castellar",
    "Centaur",
    "Century",
    "Century Gothic",
    "Century Schoolbook",
    "Chiller",
    "Colonna MT",
    "Comic Sans MS",
    "Consolas",
    "Constantia",
    "Cooper Black",
    "Copperplate Gothic Bold",
    "Copperplate Gothic Light",
    "Corbel",
    "Corbel Light",
    "Courier New",
    "Curlz MT",
    "DVOT-Bhima",
    "DVOT-Surekh",
    "Ebrima",
    "Edwardian Script ITC",
    "Ek Mukta",
    "Elephant",
    "Engravers MT",
    "Eras Bold ITC",
    "Eras Demi ITC",
    "Eras Light ITC",
    "Eras Medium ITC",
    "Felix Titling",
    "Footlight MT Light",
    "Forte",
    "Franklin Gothic Book",
    "Franklin Gothic Demi",
    "Franklin Gothic Demi Cond",
    "Franklin Gothic Heavy",
    "Franklin Gothic Medium",
    "Franklin Gothic Medium Cond",
    "Freestyle Script",
    "French Script MT",
    "Gabriola",
    "Gadugi",
    "Garamond",
    "Georgia",
    "Gigi",
    "Gill Sans MT",
    "Gill Sans MT Condensed",
    "Gill Sans MT Ext Condensed",
    "Gill Sans Ultra Bold",
    "Gill Sans Ultra Bold Condensed",
    "Gloucester MT Extra Condensed",
    "Goudy Old Style",
    "Goudy Stout",
    "Haettenschweiler",
    "Harlow Solid Italic",
    "Harrington",
    "High Tower Text",
    "HoloLens MDL2 Assets",
    "Impact",
    "Imprint MT Shadow",
    "Informal Roman",
    "Ink Free",
    "ISCIIDev",
    "Javanese Text",
    "Jokerman",
    "Juice ITC",
    "Kokila",
    "Kristen ITC",
    "Kunstler Script",
    "Leelawadee UI",
    "Leelawadee UI Semilight",
    "Lucida Bright",
    "Lucida Calligraphy",
    "Lucida Console",
    "Lucida Fax",
    "Lucida Handwriting",
    "Lucida Sans",
    "Lucida Sans Typewriter",
    "Lucida Sans Unicode",
    "Magneto",
    "Maiandra GD",
    "Malgun Gothic",
    "Malgun Gothic Semilight",
    "Mangal",
    "Marat1",
    "Marat2",
    "Marlett",
    "Matura MT Script Capitals",
    "Microsoft Himalaya",
    "Microsoft JhengHei",
    "Microsoft JhengHei Light",
    "Microsoft JhengHei UI",
    "Microsoft JhengHei UI Light",
    "Microsoft New Tai Lue",
    "Microsoft PhagsPa",
    "Microsoft Sans Serif",
    "Microsoft Tai Le",
    "Microsoft YaHei",
    "Microsoft YaHei Light",
    "Microsoft YaHei UI",
    "Microsoft YaHei UI Light",
    "Microsoft Yi Baiti",
    "MingLiU-ExtB",
    "MingLiU_HKSCS-ExtB",
    "Mistral",
    "Modern No. 20",
    "Mongolian Baiti",
    "Monotype Corsiva",
    "MS Gothic",
    "MS Mincho",
    "MS Outlook",
    "MS PGothic",
    "MS Reference Sans Serif",
    "MS Reference Specialty",
    "MS UI Gothic",
    "MT Extra",
    "MV Boli",
    "Myanmar Text",
    "Niagara Engraved",
    "Niagara Solid",
    "Nirmala UI",
    "Nirmala UI Semilight",
    "NSimSun",
    "OCR A Extended",
    "Old English Text MT",
    "Onyx",
    "Palace Script MT",
    "Palatino Linotype",
    "Papyrus",
    "Parchment",
    "Perpetua",
    "Perpetua Titling MT",
    "Playbill",
    "PMingLiU-ExtB",
    "Poor Richard",
    "Pristina",
    "Rage Italic",
    "Ravie",
    "Rockwell",
    "Rockwell Condensed",
    "Rockwell Extra Bold",
    "Sakal Marathi",
    "SakalBharati",
    "Sanskrit Text",
    "Script MT Bold",
    "Segoe Fluent Icons",
    "Segoe MDL2 Assets",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Black",
    "Segoe UI Emoji",
    "Segoe UI Historic",
    "Segoe UI Light",
    "Segoe UI Semibold",
    "Segoe UI Semilight",
    "Segoe UI Symbol",
    "Segoe UI Variable Display",
    "Segoe UI Variable Display",
    "Segoe UI Variable Display",
    "Segoe UI Variable Display",
    "Segoe UI Variable Small",
    "Segoe UI Variable Small",
    "Segoe UI Variable Small",
    "Segoe UI Variable Small Light",
    "Segoe UI Variable Text",
    "Segoe UI Variable Text",
    "Segoe UI Variable Text",
    "Segoe UI Variable Text Light",
    "Showcard Gothic",
    "SimSun",
    "SimSun-ExtB",
    "Sitka Banner",
    "Sitka Banner Semibold",
    "Sitka Display",
    "Sitka Display Semibold",
    "Sitka Heading",
    "Sitka Heading Semibold",
    "Sitka Small",
    "Sitka Small Semibold",
    "Sitka Subheading",
    "Sitka Subheading Semibold",
    "Sitka Text",
    "Sitka Text Semibold",
    "Snap ITC",
    "Stencil",
    "Sylfaen",
    "Symbol",
    "Tahoma",
    "Tempus Sans ITC",
    "Times New Roman",
    "Trebuchet MS",
    "Tw Cen MT",
    "Tw Cen MT Condensed",
    "Tw Cen MT Condensed Extra Bold",
    "Utsaah",
    "Verdana",
    "Viner Hand ITC",
    "Vivaldi",
    "Vladimir Script",
    "Webdings",
    "Wide Latin",
    "Wingdings",
    "Wingdings 2",
    "Wingdings 3",
    "Yu Gothic",
    "Yu Gothic Light",
    "Yu Gothic Medium",
    "Yu Gothic UI",
    "Yu Gothic UI Light",
    "Yu Gothic UI Semibold",
    "Yu Gothic UI Semilight"
]
export const chNumbers = [1, 2, 3, 4];
export const inAnimationMethods = [
    ...animation.map(val=> val.name ),
    'lefttoright',
    'mix'
]

export const animationMethods = [
    'linear',
    'easenone',
    'easeinquad',
    'easeoutquad',
    'easeinoutquad',
    'easeoutinquad',
    'easeincubic',
    'easeoutcubic',
    'easeinoutcubic',
    'easeoutincubic',
    'easeinquart',
    'easeoutquart',
    'easeinoutquart',
    'easeoutinquart',
    'easeinquint',
    'easeoutquint',
    'easeinoutquint',
    'easeoutinquint',
    'easeinsine',
    'easeoutsine',
    'easeinoutsine',
    'easeoutinsine',
    'easeinexpo',
    'easeoutexpo',
    'easeinoutexpo',
    'easeoutinexpo',
    'easeincirc',
    'easeoutcirc',
    'easeinoutcirc',
    'easeoutincirc',
    "easeinelastic",
    "easeoutelastic",
    "easeinoutelastic",
    "easeoutinelastic",
    "easeinback",
    "easeoutback",
    "easeinoutback",
    "easeoutintback",
    "easeoutbounce",
    "easeinbounce",
    "easeinoutbounce",
    "easeoutinbounce",
]
