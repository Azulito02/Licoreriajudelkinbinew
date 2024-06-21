import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import '../styles/App.css';
import html2canvas from 'html2canvas';
import Footer from '../components/Footer';
import emailjs from 'emailjs-com';
import * as XLSX from 'xlsx';
import { FaFileExcel, FaEnvelopeCircleCheck, FaImage, FaFilePdf  } from 'react-icons/fa6';

function Estadisticas({ rol }) {
  //Instancias de los gráficos
  const [productos, setProductos] = useState([]); 
  const [graficoProductoMasVendido, setgraficoProductoMasVendido] = useState(null);
  const [graficoVentasPorCategoria, setgraficoVentasPorCategoria] = useState(null);
  const [graficoVentasPorStock, setgraficoVentasPorStock] = useState(null);
  const [graficoTopVentas, setgraficoTopVentas] = useState(null);

  //Conjunto de datos
  const [productosMasVendido, setProductosMasVendidos] = useState([]);
  const [ventasPorCategoria, setVentasPorCategoria] = useState([]);
  const [ventasPorStock, setVentasPorStock] = useState([]);
  const [topVentas, setTopVentas] = useState([]);
  const [myChart, setMyChart] = useState(null);

  //Correo Productos mas vendidos
  const formatearproductosMasVendido = (productosMasVendido) => {
    return productosMasVendido.map(productoMasVendido => {
      return `Nombres: ${productoMasVendido.nombre} \ntotal_vendido: ${productoMasVendido.total_vendido}`;
    }).join('\n\n');
  };

  const enviarCorreo1 = () => {
    const productosMasVendidoFormateados = formatearproductosMasVendido(productosMasVendido);
    const data = {
      title: 'Estas son las estadisticas productos mas vendidos',
      subject: 'Reporte de productos mas vendidos',
      to_name: 'Usuario',
      user_email: 'miltonestudio023@gmail.com',
      message: productosMasVendidoFormateados,
    };

    emailjs.send('service_f37i8f8', 'template_jesorxw', data, 'TDFiRCsyprx0mqED5')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
  };

  //Correo ventas por categoria
   const formatearventasPorCategoria = (ventasPorCategoria) => {
    return ventasPorCategoria.map(ventaPorCategoria => {
      return `nombres categorias: ${ventaPorCategoria.nombre_categoria} \nVentas_Totales: ${ventaPorCategoria.Ventas_Totales}`;
    }).join('\n\n');
  };

  const enviarCorreo2 = () => {
    const ventasPorCategoriaFormateados = formatearventasPorCategoria(ventasPorCategoria);
    const data = {
      title: 'Estas son las estadisticas de ventas por categoria',
      subject: 'Reporte de ventas por categoria',
      to_name: 'Usuario',
      user_email: 'olivaj309@gmail.com',
      message: ventasPorCategoriaFormateados,
    };

    emailjs.send('service_cp7qgnz', 'template_0ebp4u4', data, 'TDFiRCsyprx0mqED5')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
  };

   //Correo ventas por stock
    const formatearventasPorStock = (ventasPorStock) => {
    return ventasPorStock.map(ventaPorStock => {
      return `Nombres: ${ventaPorStock.nombre} \nVentas_Totales: ${ventaPorStock.Ventas_Totales}`;
    }).join('\n\n');
  };

  const enviarCorreo3 = () => {
    const ventasPorStockFormateados = formatearventasPorStock(ventasPorStock);
    const data = {
      title: 'Estas son las ventas por stock',
      subject: 'Reporte de ventas por stock',
      to_name: 'Usuario',
      user_email: 'olivaj309@gmail.com',
      message: ventasPorStockFormateados,
    };

    emailjs.send('service_nfi00x9', 'template_jesorxw', data, 'TDFiRCsyprx0mqED5')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
  };

   //Correo topventas
  const formateartopVentas = (topVentas) => {
    return topVentas.map(topVenta => {
      return `nombres: ${topVenta.nombre} \nCantidad_Total_Vendida: ${topVenta.Cantidad_Total_Vendida}`;
    }).join('\n\n');
  };

  const enviarCorreo4 = () => {
    const topVentasFormateadas = formateartopVentas(topVentas);
    const data = {
      title: 'Estas son top ventas',
      subject: 'Reporte de top ventas',
      to_name: 'Julio',
      user_email: 'olivaj309@gmail.com',
      message: topVentasFormateadas,
    };

    emailjs.send('service_f37i8f8', 'template_jesorxw', data, 'TDFiRCsyprx0mqED5')
      .then((response) => {
        alert('Correo enviado.');
        console.log('Correo enviado.', response);
      })
      .catch((error) => {
        alert('Error al enviar el correo.');
        console.error('Error al enviar el correo:', error);
      });
  };





  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto') 
      .then((response) => response.json())  
      .then((data) => setProductos(data)) 
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []); 

  useEffect(() => {
    fetch('http://localhost:5000/crudRoutes2/Productosmasvendidosysucantidadtotalvendida')
      .then((response) => response.json())
      .then((data) => setProductosMasVendidos(data))
      .catch((error) => console.error('Error al obtener los productos mas vendidos:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudRoutes2/ventasporcategoriadeproducto')
      .then((response) => response.json())
      .then((data) => setVentasPorCategoria(data))
      .catch((error) => console.error('Error al obtener las ventas por categoria:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudRoutes2/ventasdeproductoporstock')
      .then((response) => response.json())
      .then((data) => setVentasPorStock(data))
      .catch((error) => console.error('Error al obtener las ventas por stock:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/crudRoutes2/top5ventasporproducto')
      .then((response) => response.json())
      .then((data) => setTopVentas(data))
      .catch((error) => console.error('Error al obtener los top de venta:', error));
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      const ctx = document.getElementById('myChart');

      if (myChart !== null) {
        myChart.destroy();
      }

      const nombresProductos = productos.map((producto) => producto.nombre); 
      const Existencia = productos.map((producto) => producto.existencia);  

      const almacen = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombresProductos,  
          datasets: [{
            label: 'existencia disponible', 
            data: Existencia,  
            backgroundColor: 'rgba(54, 162, 235, 0.5)', 
            borderColor: 'rgba(54, 162, 235, 1)',  
            borderWidth: 1 
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true  
            }
          }
        }
      });
      setMyChart(almacen); 
    }
  }, [productos]); 

  useEffect(() => {
    if (productosMasVendido.length > 0) {
      const ctx = document.getElementById('graficoProductoMasVendido').getContext('2d');

      if (graficoProductoMasVendido !== null) {
        graficoProductoMasVendido.destroy();
      }

      const nombres = productosMasVendido.map((productoMasVendido) => productoMasVendido.nombre);
      const total_vendido = productosMasVendido.map((productoMasVendido) => productoMasVendido.total_vendido);

      const grafico = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombres,
          datasets: [{
            label: 'Existencia disponible',
            data: total_vendido,
            backgroundColor: 'rgba(255,99,132,0.5)',
            borderColor: 'rgba(255,99,132,0.5)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setgraficoProductoMasVendido(grafico);
    }
  }, [productosMasVendido]);

  
  useEffect(() => {
    if (ventasPorCategoria.length > 0) {
      const ctx = document.getElementById('graficoVentaPorCategoria').getContext('2d');

      if (graficoVentasPorCategoria !== null) {
        graficoVentasPorCategoria.destroy();
      }

      const nombres_categorias = ventasPorCategoria.map((ventaPorCategoria) => ventaPorCategoria.nombre_categoria);
      const ventas_totales = ventasPorCategoria.map((ventaPorCategoria) => ventaPorCategoria.Ventas_Totales);

      const grafico = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: nombres_categorias,
          datasets: [{
            label: 'Ventas por Categoria',
            data: ventas_totales,
            backgroundColor: [
              'rgba(255,99,132,0.5)',
              'rgba(54,162,235,0.5)',
              'rgba(255,206,86,0.5)',
              'rgba(75,192,192,0.5)',
              'rgba(153,102,255,0.5)',
              'rgba(255,159,64,0.5)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54,162,235,1)',
              'rgba(255,206,86,1)',
              'rgba(75,192,192,1)',
              'rgba(153,102,255,1)',
              'rgba(255,159,64,1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive:true,
          plugins:{
            legend:{
              position:'top',
            },
            title: {
              display:true,
              text:'Ventas por Categoria'
            }
          }
        }
      });
      setgraficoVentasPorCategoria(grafico);
    }
  }, [ventasPorCategoria]);

  useEffect(() => {
    if (ventasPorStock.length > 0) {
      const ctx = document.getElementById('graficoVentaPorStock').getContext('2d');

      if (graficoVentasPorStock !== null) {
        graficoVentasPorStock.destroy();
      }

      const nombres = ventasPorStock.map((ventaPorStock) => ventaPorStock.nombre);
      const ventas_totales = ventasPorStock.map((ventaPorStock) => ventaPorStock.Ventas_Totales);

      const grafico = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: nombres,
          datasets: [{
            label: 'Ventas por Stock',
            data: ventas_totales,
            backgroundColor: 'rgba(153,102,255,1)',
            borderColor: 'rgba(153,102,255,1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      setgraficoVentasPorStock(grafico);
    }
  }, [ventasPorStock]);

  useEffect(() => {
    if (topVentas.length > 0) {
      const ctx = document.getElementById('graficoTopVenta').getContext('2d');

      if (graficoTopVentas !== null) {
        graficoTopVentas.destroy();
      }

      const nombres = topVentas.map((topVenta) => topVenta.nombre);
      const cantidad_total_vendida = topVentas.map((topVenta) => topVenta.Cantidad_Total_Vendida);

      const grafico = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: nombres,
          datasets: [{
            label: 'Top 5 de ventas por producto',
            data: cantidad_total_vendida,
            backgroundColor: [
              'rgba(255,99,132,0.5)',
              'rgba(54,162,235,0.5)',
              'rgba(255,206,86,0.5)',
              'rgba(75,192,192,0.5)',
              'rgba(153,102,255,0.5)',
              'rgba(255,159,64,0.5)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54,162,235,1)',
              'rgba(255,206,86,1)',
              'rgba(75,192,192,1)',
              'rgba(153,102,255,1)',
              'rgba(255,159,64,1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive:true,
          plugins:{
            legend:{
              position:'top',
            },
            title: {
              display:true,
              text:'Top 5 de ventas por producto'
            }
          }
        }
      });
      setgraficoTopVentas(grafico);
    }
  }, [topVentas]);

  const generarReporteAlmacen = () => {
    fetch('http://localhost:5000/crud/readproducto')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((productos) => {
        const doc = new jsPDF();  // Crea un nuevo documento PDF con jsPDF
        let y = 15; // Posición inicial en el eje Y dentro del documento PDF

        doc.text("Reporte de Estado de Almacén", 20, 10);  // Agrega un título al documento PDF

        productos.forEach((producto) => {  // Itera sobre los productos para generar el reporte
          doc.text(`Nombre: ${producto.nombre}`, 20, y);  // Agrega el nombre del producto al documento PDF
          doc.text(`existencia: ${producto.existencia}`, 20, y + 10);  // Agrega la cantidad del producto al documento PDF

          y += 30; // Incrementa la posición Y para el siguiente producto
          if (y >= 280) {  // Si alcanza el final de la página, crea una nueva página
            doc.addPage();
            y = 15; // Reinicia la posición Y en la nueva página
          }
        });

        doc.save("reporte_almacen.pdf");  // Descarga el documento PDF con el nombre 'reporte_almacen.pdf'
      })
      .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
  };

  const generarReporteProductoMasVendido = () => {
    fetch('http://localhost:5000/crudRoutes2/Productosmasvendidosysucantidadtotalvendida')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((productos) => {
        const doc = new jsPDF();  // Crea un nuevo documento PDF con jsPDF
        let y = 15; // Posición inicial en el eje Y dentro del documento PDF

        doc.text("Reporte de Estado de Almacén", 20, 10);  // Agrega un título al documento PDF

        productos.forEach((producto) => {  // Itera sobre los productos para generar el reporte
          doc.text(`Nombre: ${producto.nombre}`, 20, y);  // Agrega el nombre del producto al documento PDF
          doc.text(`Total vendido: ${producto.total_vendido}`, 20, y + 10);  // Agrega la cantidad del producto al documento PDF

          y += 30; // Incrementa la posición Y para el siguiente producto
          if (y >= 280) {  // Si alcanza el final de la página, crea una nueva página
            doc.addPage();
            y = 15; // Reinicia la posición Y en la nueva página
          }
        });

        doc.save("reporte_producto_mas_vendido.pdf");  // Descarga el documento PDF con el nombre 'reporte_almacen.pdf'
      })
      .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
  };

  const generarReporteVentasCategoria = () => {
    fetch('http://localhost:5000/crudRoutes2/ventasporcategoriadeproducto')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((productos) => {
        const doc = new jsPDF();  // Crea un nuevo documento PDF con jsPDF
        let y = 15; // Posición inicial en el eje Y dentro del documento PDF

        doc.text("Reporte de Estado de Almacén", 20, 10);  // Agrega un título al documento PDF

        productos.forEach((producto) => {  // Itera sobre los productos para generar el reporte
          doc.text(`nombres_categorias: ${producto.nombre_categoria}`, 20, y);  // Agrega el nombre del producto al documento PDF
          doc.text(`ventas_totales: ${producto.Ventas_Totales}`, 20, y + 10);  // Agrega la cantidad del producto al documento PDF

          y += 30; // Incrementa la posición Y para el siguiente producto
          if (y >= 280) {  // Si alcanza el final de la página, crea una nueva página
            doc.addPage();
            y = 15; // Reinicia la posición Y en la nueva página
          }
        });

        doc.save("reporte_ventacategoria.pdf");  // Descarga el documento PDF con el nombre 'reporte_almacen.pdf'
      })
      .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
  };

  const generarReporteVentaStock = () => {
    fetch('http://localhost:5000/crudRoutes2/ventasdeproductoporstock')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((productos) => {
        const doc = new jsPDF();  // Crea un nuevo documento PDF con jsPDF
        let y = 15; // Posición inicial en el eje Y dentro del documento PDF

        doc.text("Reporte de Estado de Almacén", 20, 10);  // Agrega un título al documento PDF

        productos.forEach((producto) => {  // Itera sobre los productos para generar el reporte
          doc.text(`nombres: ${producto.nombre}`, 20, y);  // Agrega el nombre del producto al documento PDF
          doc.text(`ventas_totales: ${producto.Ventas_Totales}`, 20, y + 10);  // Agrega la cantidad del producto al documento PDF

          y += 30; // Incrementa la posición Y para el siguiente producto
          if (y >= 280) {  // Si alcanza el final de la página, crea una nueva página
            doc.addPage();
            y = 15; // Reinicia la posición Y en la nueva página
          }
        });

        doc.save("reporte_ventastock.pdf");  // Descarga el documento PDF con el nombre 'reporte_almacen.pdf'
      })
      .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
  };

  const generarReporteVentaTop5 = () => {
    fetch('http://localhost:5000/crudRoutes2/top5ventasporproducto')  // Realiza una solicitud GET al servidor para obtener productos
      .then((response) => response.json())  // Convierte la respuesta a formato JSON
      .then((productos) => {
        const doc = new jsPDF();  // Crea un nuevo documento PDF con jsPDF
        let y = 15; // Posición inicial en el eje Y dentro del documento PDF

        doc.text("Reporte de Estado de Almacén", 20, 10);  // Agrega un título al documento PDF

        productos.forEach((producto) => {  // Itera sobre los productos para generar el reporte
          doc.text(`nombres: ${producto.nombre}`, 20, y);  // Agrega el nombre del producto al documento PDF
          doc.text(`cantidad_total_vendida: ${producto.Cantidad_Total_Vendida}`, 20, y + 10);  // Agrega la cantidad del producto al documento PDF

          y += 30; // Incrementa la posición Y para el siguiente producto
          if (y >= 280) {  // Si alcanza el final de la página, crea una nueva página
            doc.addPage();
            y = 15; // Reinicia la posición Y en la nueva página
          }
        });

        doc.save("reporte_almacen_top5.pdf");  // Descarga el documento PDF con el nombre 'reporte_almacen.pdf'
      })
      .catch((error) => console.error('Error al obtener los productos:', error));  // Manejo de errores en caso de fallar la solicitud
  };

  const generarReporteAlmacenImg = async () => {
    try {
      // Utiliza html2canvas para capturar el contenido del elemento con el ID 'myChart' y obtener un objeto canvas
      const canvas = await html2canvas(document.getElementById('myChart'));
      // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
      const pdf = new jsPDF();
      // Convierte el objeto canvas a una URL de datos en formato PNG
      const imgData = canvas.toDataURL('image/png');
      // Añade un texto al documento PDF
      pdf.text("Reporte de Estado de Almacén", 20, 10);
      // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
      pdf.addImage(imgData, 'PNG', 10, 20, 180, 180);
      // Guarda el documento PDF con un nombre específico
      pdf.save("reporte_almacen_con_grafico.pdf");
    } catch (error) {
      // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  const generarRepProductoMasVendidoImg = async () => {
    try {
      // Utiliza html2canvas para capturar el contenido del elemento con el ID 'graficoProductoMasVendido' y obtener un objeto canvas
      const canvas = await html2canvas(document.getElementById('graficoProductoMasVendido'));
      // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
      const pdf = new jsPDF();
      // Convierte el objeto canvas a una URL de datos en formato PNG
      const imgData = canvas.toDataURL('image/png');
      // Añade un texto al documento PDF
      pdf.text("Reporte del producto más vendido", 20, 10);
      // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
      pdf.addImage(imgData, 'PNG', 10, 20, 180, 180);
      // Guarda el documento PDF con un nombre específico
      pdf.save("reporte_producto_mas_vendido.pdf");
    } catch (error) {
      // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  const generarReporteVentasCategoriaImg = async () => {
    try {
      // Utiliza html2canvas para capturar el contenido del elemento con el ID 'graficoProductoMasVendido' y obtener un objeto canvas
      const canvas = await html2canvas(document.getElementById('graficoVentaPorCategoria'));
      // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
      const pdf = new jsPDF();
      // Convierte el objeto canvas a una URL de datos en formato PNG
      const imgData = canvas.toDataURL('image/png');
      // Añade un texto al documento PDF
      pdf.text("Reporte del producto más vendido", 20, 10);
      // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
      pdf.addImage(imgData, 'PNG', 10, 20, 180, 180);
      // Guarda el documento PDF con un nombre específico
      pdf.save("reporte_ventas_categoria.pdf");
    } catch (error) {
      // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  const generarReporteVentaStockImg = async () => {
    try {
      // Utiliza html2canvas para capturar el contenido del elemento con el ID 'graficoProductoMasVendido' y obtener un objeto canvas
      const canvas = await html2canvas(document.getElementById('graficoVentaPorStock'));
      // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
      const pdf = new jsPDF();
      // Convierte el objeto canvas a una URL de datos en formato PNG
      const imgData = canvas.toDataURL('image/png');
      // Añade un texto al documento PDF
      pdf.text("Reporte del producto más vendido", 20, 10);
      // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
      pdf.addImage(imgData, 'PNG', 10, 20, 180, 180);
      // Guarda el documento PDF con un nombre específico
      pdf.save("reporte_venta_stock.pdf");
    } catch (error) {
      // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  const generarReporteVentaTop5Img = async () => {
    try {
      // Utiliza html2canvas para capturar el contenido del elemento con el ID 'graficoProductoMasVendido' y obtener un objeto canvas
      const canvas = await html2canvas(document.getElementById('graficoTopVenta'));
      // Crea un nuevo objeto jsPDF para trabajar con documentos PDF
      const pdf = new jsPDF();
      // Convierte el objeto canvas a una URL de datos en formato PNG
      const imgData = canvas.toDataURL('image/png');
      // Añade un texto al documento PDF
      pdf.text("Reporte del producto más vendido", 20, 10);
      // Añade la imagen capturada del gráfico al documento PDF, con ajustes de coordenadas y tamaño
      pdf.addImage(imgData, 'PNG', 10, 20, 180, 180);
      // Guarda el documento PDF con un nombre específico
      pdf.save("reporte_venta_top_5.pdf");
    } catch (error) {
      // Captura y maneja cualquier error que pueda ocurrir durante la ejecución del bloque try
      console.error('Error al generar el reporte con imagen:', error);
    }
  };


  const imprimirEstadisticas = () => {
    console.log("Imprimiendo estadísticas...");
  }

 // Función para exportar a Excel
 const exportarAExcelCategoria = () => {
  // Convertir los datos JSON a una hoja de trabajo de Excel
  const worksheet = XLSX.utils.json_to_sheet(ventasPorCategoria);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas Por Categoria');

  // Generar y descargar el archivo Excel
  XLSX.writeFile(workbook, 'Ventas por categoria.xlsx');
};
  
const exportarAExcel = () => {
  // Convertir los datos JSON a una hoja de trabajo de Excel
  const worksheet = XLSX.utils.json_to_sheet(productosMasVendido);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos mas vendidos');

  // Generar y descargar el archivo Excel
  XLSX.writeFile(workbook, 'Productos mas Vendidos.xlsx');
};

const exportarAExcelTopventas = () => {
  // Convertir los datos JSON a una hoja de trabajo de Excel
  const worksheet = XLSX.utils.json_to_sheet(topVentas);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Top Productos vendidos');

  // Generar y descargar el archivo Excel
  XLSX.writeFile(workbook, 'Top 5 productos mas vendidos.xlsx');
};

const exportarAExcelventasprstock = () => {
  // Convertir los datos JSON a una hoja de trabajo de Excel
  const worksheet = XLSX.utils.json_to_sheet(ventasPorStock);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock vendido');

  // Generar y descargar el archivo Excel
  XLSX.writeFile(workbook, 'Ventas de producto por stock.xlsx');
};

  return (
    <div>
      <Header rol={rol} />
      <Container className="my-4">
        <Row>

          <Col xs={12} md={12}>
            <Card className="mb-4">
              <Card.Header>Estado del almacen</Card.Header>
              <Card.Body>
                <canvas id="myChart"></canvas>
                <Button onClick={generarReporteAlmacen}>
                  Generar reporte
                </Button>
                <Button onClick={generarReporteAlmacenImg}>
                  Generar reporte con imagen
                </Button>
              </Card.Body>

            </Card>
          </Col>


          <Col xs={12} md={6}>
            <Card className="mb-4">
              <Card.Header>Producto más vendido</Card.Header>
              <Card.Body>
                <canvas id="graficoProductoMasVendido"></canvas>
                <Button onClick={generarRepProductoMasVendidoImg} className="m-1">
                <FaFilePdf style={{ color: 'white' }} />
                </Button>
                <Button onClick={generarReporteProductoMasVendido} className="m-1">
                < FaImage style={{ color: 'white' }} />
                </Button>
                <Button variant="secondary" onClick={enviarCorreo1} className="m-1">
             <FaEnvelopeCircleCheck style={{ color: 'white' }} />
                </Button> 
                <Button variant="success" onClick={exportarAExcel} className="m-1">
                 <FaFileExcel style={{ color: 'white' }} />
                 </Button>
              </Card.Body>
            </Card>
          </Col>


          <Col xs={12} md={6}>
            <Card className="mb-4">
              <Card.Header>Venta por Stock</Card.Header>
              <Card.Body>
                <canvas id="graficoVentaPorStock"></canvas>
                <Button onClick={generarReporteVentaStock} className="m-1">
                <FaFilePdf style={{ color: 'white' }} />
                </Button>
                <Button onClick={generarReporteVentaStockImg} className="m-1">
                < FaImage style={{ color: 'white' }} />
                </Button>
                <Button variant="secondary" onClick={enviarCorreo3} className="m-1">
                  <FaEnvelopeCircleCheck style={{ color: 'white' }} />
                </Button>
                <Button variant="success" onClick={exportarAExcelventasprstock} className="m-1">
                 <FaFileExcel style={{ color: 'white' }} />
                 </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={11} md={6}>
            <Card className="mb-4">
              <Card.Header>Venta por categoria</Card.Header>
              <Card.Body>
                <canvas id="graficoVentaPorCategoria"></canvas>
                <Button onClick={generarReporteVentasCategoria} className="m-1">
                <FaFilePdf style={{ color: 'white' }} />
                </Button>
                <Button onClick={generarReporteVentasCategoriaImg} className="m-1">
                < FaImage style={{ color: 'white' }} />
                </Button>
                <Button variant="secondary" onClick={enviarCorreo2} className="m-1">
                  <FaEnvelopeCircleCheck style={{ color: 'white' }} />
                </Button> 
                <Button variant="success" onClick={exportarAExcelCategoria} className="m-1">
                 <FaFileExcel style={{ color: 'white' }} />
                 </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card className="mb-4">
              <Card.Header>Top 5 de Ventas por Productos</Card.Header>
              <Card.Body>
                <canvas id="graficoTopVenta"></canvas>
                <Button onClick={generarReporteVentaTop5} className="m-1">
                <FaFilePdf style={{ color: 'white' }} />
                </Button>
                <Button onClick={generarReporteVentaTop5Img} className="m-1">
                < FaImage style={{ color: 'white' }} />
                </Button>
                <Button variant="secondary" onClick={enviarCorreo4} className="m-1">
                  <FaEnvelopeCircleCheck style={{ color: 'white' }} />
                </Button> 
                <Button variant="success" onClick={exportarAExcelTopventas} className="m-1">
                 <FaFileExcel style={{ color: 'white' }} />
                 </Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Estadisticas;