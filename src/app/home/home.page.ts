import { Component, Renderer2, ViewChild } from '@angular/core';
import { AnimationController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('blocks') blocks: any
  @ViewChild('background') background: any

  public options: Array<any> = [
    { icon: 'person-add-outline', text: 'Indicar amigos' },
    { icon: 'phone-portrait-outline', text: 'Recarga de celular' },
    { icon: 'wallet-outline', text: 'Depositar' },
    { icon: 'options-outline', text: 'Ajustar limite' },
    { icon: 'help-circle-outline', text: 'Me ajuda' },
    { icon: 'lock-open-outline', text: 'Bloquear cartão' },
    { icon: 'card-outline', text: 'Cartão virtual' },
  ]

  public slideOptions: any = { slidesPerView: 3, freeMode: true };

  public items: Array<any> = [
    { icon: 'help-circle-outline', text: 'Me ajuda' },
    { icon: 'person-outline', text: 'Perfil' },
    { icon: 'cash-outline', text: 'Configurar conta' },
    { icon: 'card-outline', text: 'Configurar cartão' },
    { icon: 'phone-portrait-outline', text: 'Configurações do app' }
  ]

  initialStep: number = 0
  maxTranslate: number
  private animation: Animation

  constructor(
    private animationCtrl: AnimationController,
    private platform: Platform,
    private renderer: Renderer2
  ) {
    this.maxTranslate = this.platform.height() - 200

    console.log("TESTE", this.background)
  }

  ngAfterViewInit() {
    this.createAnimation()
  }

  toggleBlocks() {
    this.initialStep = this.initialStep === 0 ? this.maxTranslate : 0;

    this.animation.direction(this.initialStep === 0 ? 'reverse' : 'normal').play();

    this.setBackgroundOpacity()
  }

  createAnimation() {
    this.animation = this.animationCtrl.create()
      .addElement(this.blocks.nativeElement)
      .duration(300)
      .fromTo('transform', 'translateY(0)', `translateY(${this.maxTranslate}px)`)
  }

  setBackgroundOpacity() {
    this.renderer.setStyle(this.background.nativeElement, 'opacity', this.initialStep === 0 ? '0' : '1')
  }

  fixedBlocks(): boolean {
    return this.initialStep === this.maxTranslate
  }

}
