const { extractValueOfAttr } = require('./audit')
const expect = require('expect')

describe('test/tiara/audit', () => {
  it('지정한 Data Attribute를 읽어오는 지 확인', () => {
    // Given
    const vueComponent = `<template>
      <main id="kakaoContent" class="cont_booking">
        <div id="cMain" data-layer="booking">
          <div id="mArticle">
            <div class="view_seat">
              <div class="area_seat" data-layer="cinemalist location">
                <span class="screen_seat" data-layer="bookingitem bookingcancel">Screen</span>
                <template v-for="seat in mySeats">
                  <div class="group_seat" :style="{width: seat.width + 'px', height: seat.height + 'px'}">
                    <img :src="seat.url" class="img_seat" :alt="ALT_IMG">
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>`

    // When
    const result = extractValueOfAttr(vueComponent, 'data-layer')

    // Then
    expect(result).toEqual([
      'booking',
      'cinemalist location',
      'bookingitem bookingcancel'
    ])
  })

  it('Data Attribute 이외 다른 Attribute를 지정해도 가져오지 않아야 함', () => {
    // Given
    const vueComponent = `<div class="view_seat">
      <div class="area_seat">
        <span class="screen_seat">Screen</span>
        <template v-for="seat in mySeats">
          <div class="group_seat" :style="{width: seat.width + 'px', height: seat.height + 'px'}">
            <img :src="seat.url" class="img_seat" :alt="ALT_IMG">
          </div>
        </template>
      </div>
    </div>`

    // When
    const result = extractValueOfAttr(vueComponent, 'class')

    // Then
    expect(result).toNotEqual([
      'view_seat',
      'area_seat',
      'screen_seat',
      'group_seat',
      'img_seat'
    ])
  })
})
