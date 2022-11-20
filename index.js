const cfg = require('./config.json')
const proc = require('child_process')

console.info('Start')

cfg.target.forEach(
    v => {
        cmd = 
        'scp ' + cfg.publicKeyPath + ' ' + v.username + '@' + v.ip +':'+ v.sshPort + ':/tmp/tmpKey'

console.log('Exec: ' + cmd)
        proc.exec(cmd,
        (err, stdout, stderr) => {
  if (err) {
    console.error('SCP Err: ' + stderr)
    process.exit();
  } else {
    console.error('Out: ' + stdout)

    proc.exec(
        'sshpass -p ' + v.password + ' ssh ' + v.username + '@' + v.ip +
            ' "touch ~/.ssh/authorized_keys && cat /tmpKey >> ~/.ssh/authorized_keys"',
        (err, stdout, stderr) => {
          if (err) {
            console.error('SSHPASS Err: ' + stderr)
            process.exit();
          } else {
            console.error('Out: ' + stdout)
          }
        })
  }
        })})

        console.info('End')