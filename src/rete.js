import Rete from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';

const container = document.querySelector('#rete');

const numSocket = new Rete.Socket('Number value');

class NumComponent extends Rete.Component {
  constructor() {
    super('Number');
  }

  builder(node) {
    let out = new Rete.Output('num', 'Number', numSocket);

    node.addOutput(out);
  }

  worker(node, inputs, outputs) {
    outputs['num'] = node.data.num;
  }
}

/* ******************EDITOR********************** */
//Crea una instancia de NodeEditor
const editor = new Rete.NodeEditor('demo@0.1.0', container);


editor.use(ConnectionPlugin)
editor.use(VueRenderPlugin)

const numComponent = new NumComponent();
editor.register(numComponent);

/* **********************MOTOR********************************* */
const engine = new Rete.Engine('demo@0.1.0');
engine.register(numComponent);

// recibir inmediatamente los resultados de los cambios
editor.on('process', async () => {
  await engine.abort();
  await engine.process(editor.toJSON());
});



const data = editor.toJSON();
await editor.fromJSON(data);


