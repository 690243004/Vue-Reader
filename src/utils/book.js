export const FONT_SIZE = [
    { fontSize:12 },
    { fontSize:14 },
    { fontSize:16 },
    { fontSize:18 },
    { fontSize:20 },
    { fontSize:22 },
  ]

export const FONT_FAMILY = [
    {font:'Default'},
    {font:'Cabin'},
    {font:'Days One'},
    {font:'Montserrat'},
    {font:'Tangerine'},
]

export const THEMELIST = [
    {
        name:'default',
        style: {
            p:{
                'color' : '#000 !important',
            },
            body: {
                'color' : '#000',
                'background' : '#cecece'
            }
        }
    },
    {
        name:'eye',
        style: {
            p:{
                'color' : '#000 !important',
            },
            body: {
                'color' : '#000',
                'background' : '#a9c1a9'
            }
        }
    },
    {
        name:'night',
        style: {
            p:{
                'color' : '#fff !important',
            },
            body: {
                'color' : '#fff',
                'background' : '#000'
            }
        }
    },
    {
        name:'gold',
        style: {
            p:{
                'color' : '#000 !important',
            },
            body: {
                'color' : '#000',
                'background' : 'rgb(241,236,226)'
            }
        }
    }
]

export function addCss(href) {
    const link = document.createElement('link')
    link.setAttribute('rel','stylesheet')
    link.setAttribute('type','text/css')
    link.setAttribute('href',href)
    document.querySelector('head').appendChild(link)
}

export function removeCss(href) {
    const link = document.getElementsByTagName('link')
    for(var i=0;i<link.length;i++){
        if(link[i].getAttribute('href')===href) {
            link[i].parentNode.removeChild(link[i])
        }
    }
}

export function removeAllCss() {
    THEMELIST.forEach(item=>{
        removeCss('http://localhost:8080/theme/theme_${item.name}.css')
    })
}

export function flatten(array){
    return [].concat(
        ...array.map(item=>{
           return [].concat(item,...flatten(item.subitems))
        })
    )

  }