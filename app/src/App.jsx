import './App.css'

function AwesomeImage() {
  return (
    <div>
      <img src="/kartBrand.png" alt="awesome cat yo" />
    </div>
  );
}

function Thing({ awesomeVariable }) {
  return <p class="flex-1">diddenblud #{awesomeVariable}</p>
}

function Main() {
  return (
    <div>
      <h1 class="text-amber-400">waddup yo</h1>
      <div>
        <p class="padding_bottom">diddy blud(s) below</p>
      </div>
      <div class="flex items-center">
        <Thing awesomeVariable={1} />
        <Thing awesomeVariable={2} />
        <Thing awesomeVariable={3} />
      </div>
      <div class="flex items-center">
        <AwesomeImage />
        <AwesomeImage />
        <AwesomeImage />
      </div>
      <Controls 
        killKart={() => alert('pretend kart is dead now')}
      />
    </div>
  )
}

function Controls({ killKart }) {
  return (
    <div class="">
      <Button onClick={killKart}>
        KILL KART....
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    /* i stole the css thing from a random example */
    <button onClick={onClick} class="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700">
      {children}
    </button>
  );
}

export default Main
