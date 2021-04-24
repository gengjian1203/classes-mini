import comPulbic from './simple'

import PanelApple from './panelApple'
import PanelBig from './panelBig'

const regCom = () => {
	comPulbic.PanelApple = PanelApple
	comPulbic.PanelBig = PanelBig
	console.log('regCom')
}

export default regCom
