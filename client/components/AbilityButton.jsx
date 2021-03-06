import React from 'react';

function AbilityButton(props) {
	if (!props.show) {
		return null;
	}
	return (
		<button disabled={props.disabled} className={'button abilityButton' + (props.abilityUsed ? ' used' : '')} onClick={props.onClick} title={props.title}>{props.label}</button>
	)
}

export default AbilityButton;