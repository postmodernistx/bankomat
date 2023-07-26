<script setup lang="ts">
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { onMounted, ref } from 'vue';

gsap.registerPlugin(Draggable);

const creditCard = ref<HTMLDivElement | null>(null);
const atm = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (creditCard.value === null || atm.value === null) {
    console.error('No creditCard or atm ref');
    return;
  }

  // Set start position for credit card
  const startY = atm.value.offsetTop + atm.value.clientHeight;
  const startX = atm.value.offsetLeft + atm.value.clientWidth + 200;
  gsap.set(creditCard.value, {
    y: startY,
    x: startX,
  });
  gsap.set(creditCard.value, {
    rotateY: (startY / window.innerHeight) * 100,
  });

  // Draggable
  Draggable.create(creditCard.value, {
    bounds: document.body,
    inertia: true,
    edgeResistance: 0.65,
    type: 'x, y',
    onDrag: function() {
      const rotation = Math.round((this.y / window.innerHeight) * 100);
      gsap.set(creditCard.value, { rotationY: rotation });
    },
  });
});
</script>

<template>
  <div>
    <div class="credit-card" ref="creditCard">
      <img src="../../assets/credit-card-svgrepo-com.svg" alt="" />
    </div>

    <div class="atm">
      <h1>Bankomat<sup>®</sup></h1>
      <div class="inset" ref="atm">
        <div class="inset-2">
          <div class="screen">
            <div class="black">
              <span v-for="i in 4" :key="`leftBtn-${i}`"></span>
            </div>
            <div class="center">
              <div class="instruction" data-text="Sätt in ditt kort">Sätt in ditt kort</div>

              <div class="english">
                <img src="../../assets/card.svg" alt="Credit card symbol" width="57" height="47" />
                <span>Please insert your card</span>
              </div>

              <div class="cards">
                <img src="../../assets/visa.webp" alt="Visa logo" width="500" height="400" />
                <img src="../../assets/mastercard.webp" alt="Mastercard logo" width="500" height="400" />
                <img src="../../assets/diners.webp" alt="Diners Club logo" width="500" height="400" />
                <img src="../../assets/amex.webp" alt="American Express logo" width="500" height="400" />
              </div>
            </div>
            <div class="black">
              <span v-for="i in 4" :key="`rightBtn-${i}`"></span>
            </div>
          </div>
          <div class="slots">
            <div class="manufacturer">
              Wincor
              <hr>
              Nixdorf
            </div>
            <div class="slot">
              <div class="text">Kvitto</div>
              <div class="insert"></div>
            </div>

            <div class="slot card">
              <div class="text">Kort</div>
              <div class="insert">
                <div></div>
              </div>
            </div>
          </div>

          <div class="banknotes slots">
            <div class="slot"><span class="text">Sedlar</span></div>
            <div class="hatch"></div>
          </div>

          <div class="divider"></div>

          <div class="pinpad">
            <div class="numbers">
              <button v-for="i in 9" :key="`btn-${i}`">{{ i }}</button>
              <button>0</button>
            </div>
            <div class="buttons">
              <button class="cancel">Avbryt <span></span></button>
              <button class="correct">Fel <span></span></button>
              <button class="help">Hjälp <span></span></button>
              <button class="confirm">OK <span></span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'atm';
</style>
