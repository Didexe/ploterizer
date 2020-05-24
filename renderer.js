// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const Serialport = require('serialport')
const tableify = require('tableify')
const Plotter = require('hpgl').Plotter
const transport = new Serialport('/dev/tty.usbmodem14201', { autoOpen: false })
const plotter = new Plotter()

Serialport.list((err, ports) => {
  console.log('ports', ports);
  if (err) {
    document.getElementById('error').textContent = err.message
    return
  } else {
    document.getElementById('error').textContent = ''
  }

  if (ports.length === 0) {
    document.getElementById('error').textContent = 'No ports discovered'
  }

  tableHTML = tableify(ports)
  document.getElementById('ports').innerHTML = tableHTML
})

// plotter.connect(transport, {}, function(error) {
//   if (error) {
//     console.log(error);
//   }

//   console.log(plotter.ready)
//   // plotter.getModel((model) => console.log(model))
// })

transport.on('data', (data) => console.log(data))

function openPort() {
  console.log('openning port')
    transport.open((error) => {
      if(error) {
        console.log(error);
      } else {
        console.log('port opened');
        
      }
    })
  }
  function sendSomething() {
    console.log('writing')
    transport.write('IN;', function(error, bitesWRiten) {
      // if(error) {
        console.log(error)
        // }
        console.log(bitesWRiten);
      })
      transport.write('SP0;');
      transport.write('PU10,10;', function(error, bitesWRiten) {
        // if(error) {
          console.log(error)
          // }
          console.log(bitesWRiten);
        })
    }
    
