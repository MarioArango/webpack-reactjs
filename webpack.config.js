const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //Ruta, respecto a este archivo, en donde se encuentra nuestra entrada principal
    entry: './src/index.jsx',
    //Es donde se va crear automaticamente una salida de archivos minificados y unidos
    output: {
        //Ruta absoluta, respecto a este archivo, en donde se encontrara el archivo que se creara automaticamente, no se incluye el nombre, solo la carpeta que lo contendra
        path: path.join(__dirname, '/dist'),
        //Nombre del archivo js minificado que se creara
        filename: 'bundle.js'
    },
    //Webpack solo entiende js, entonces para crear y enlazar automaticamente nuestro archivo minificado con el index.html principal necesitamos "npm i html-webpack-plugin", plugin de produccion
    plugins: [
        new HtmlWebpackPlugin({//Pasamos opciones a travez de un objeto
            //El nombre del archivo html de salida que se creara automaticamente en el dist y enlazara con nuestro archivo minificado, si no se incluye por defecto lleva el mismo nombre que el archivo de desarrollo del template
            filename: 'index.html',
            //Ruta, respecto a este archivo, en donde se encuentra nuestro html de desarrollo que se llevara a produccion para enlazarlo automaticamente con nuestro archivo minificado
            template: './src/public/index.html'
        })
    ],
    //Para camibar el puerto del servidor de desarrollo 'npm i webpack-dev-server', plugin de desarrollo, se ejecuta con 'npx webpack-dev-server', no creara la carpeta dist, ni la minificacion.
    //Para produccion lo mismo, 'npx webpack'
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
    //Configura las extensiones que debe procesar (test) y entender (use - usa los loader instalados)
    module : {
        rules: [
            //Objeto que define entender  JS y JSX
            {
                //Procesa y entienda los archivos con estas extensiones
                test: /\.(js|jsx)$/,
                //Para ello usa estos modulos loader
                use: [
                    {loader: 'babel-loader'}
                ],
                //Para que no tradusca los modulos, sino se tardiria  demasiado en compilar
                exclude: /node_modules/
            },
            {
                test: /\.css$/, //para que procesece este tipo de archivos
                use: [ // entienda esos archivos mediante estos modulos
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    },
    //Sirve para que archivos puede entender en la importaciones, para no especificar si es JS o JSX, es una extension en las importaciones sin extensiones por default
    resolve: {
        extensions: ['.js', '.jsx']
    }
    
}