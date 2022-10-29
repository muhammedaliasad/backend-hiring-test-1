const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.welcome = function welcome() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Thanks for calling the TuringTech Service. ' +
    'Please press 1 to call to our support agent. ' +
    'Press 2 for to record a voicemail',
    {loop: 3}
  );

  return voiceResponse.toString();
};

exports.menu = function menu(digit) {
  const optionActions = {
    '1': redirectCall,
    '2': voiceMailRecord,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : redirectWelcome();
};


exports.recordVoiceMail = function recordVoiceMail(digit){
  const twiml = new VoiceResponse();
  if(digit == '5'){
    twiml.record({
      finishOnKey: '#',
      playBeep: true,
      transcribe: true
  });

  return twiml.toString();
  }

return redirectWelcome();

};


function redirectCall() {
  const twiml = new VoiceResponse();

  twiml.say(
    'Your Call is redirecting to our support agent. Please wait for a while.',
    {voice: 'alice', language: 'en-GB'}
  );
  const mobile_number  = '+923473822189'

  twiml.dial().number(mobile_number)

  return twiml.toString();
}


function voiceMailRecord() {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    action: '/ivr/recordVoiceMail',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Please press 5 to start voice recording and press * to complete the recording.',
    {voice: 'alice', language: 'en-GB', loop: 3}
  );

  return twiml.toString();
}


function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('Returning to the main menu', {
    voice: 'alice',
    language: 'en-GB',
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}