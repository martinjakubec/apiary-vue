<template>
  <div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <td class="first-col">{{$t('locale.controls.dateOfControl')}}</td>
            <td>{{$t('locale.controls.numberOfFrames')}}</td>
            <td>{{$t('locale.controls.numberOfFullFrames')}}</td>
            <td>{{$t('locale.controls.numberOfFramesWithSealedBrood')}}</td>
            <td>{{$t('locale.controls.unsealedBrood.label')}}</td>
            <td>{{$t('locale.controls.queenSpotted.label')}}</td>
            <td>{{$t('locale.controls.freshEggs.label')}}</td>
            <td>{{$t('locale.controls.weather.label')}}</td>
            <td>{{$t('locale.controls.temperature')}}</td>
            <td>{{$t('locale.controls.hostility')}}</td>
            <td>{{$t('locale.controls.workDone')}}</td>
            <td>{{$t('locale.controls.workToDo')}}</td>
            <td colspan="2">{{$t('locale.controls.editDelete')}}</td>
          </tr>
        </thead>
        <tbody>
          <controls-table-row
            v-for="control of $props.controls"
            :key="control.controlCustomId"
            :control="control"
            @update-hive="$emit('update-hive')"
            @error-emitted="$emit('error-emitted')"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ControlsTableRow from './ControlsTableRow.vue';

export default {
  components: {
    ControlsTableRow,
  },
  props: {
    controls: {type: Array},
  },
  emits: ['update-hive', 'error-emitted']
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  position: relative;
  // max-width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    background-color: darken($lighter-gray, 4%);
    height: 15px;
    &-thumb {
      background-color: $lighter-gray;
      &:hover {
        background-color: $dark-yellow;
      }
    }
  }
  table {
    width: 2000px;
    border-collapse: collapse;
    :deep(td) {
      padding: 7px 15px;
    }
    thead {
      // width: 100%;
      font-size: 1.6rem;
      font-weight: bold;
      :deep(td) {
        background-color: $lighter-gray;
        line-height: 1.4;

        &.first-col {
          position: sticky;
          left: 0;
          z-index: 2;
          &::after {
            position: absolute;
            right: -14px;
            top: 0;
            content: '';
            display: block;
            height: 100%;
            width: 15px;
            background: linear-gradient(
              90deg,
              darken($dark-gray, 2%) 0%,
              transparentize(darken($dark-gray, 2%), 1) 100%
            );
          }
        }
      }
    }

    tbody {
      // width: 100%;
      font-size: 1.4rem;
      :deep(td) {
        vertical-align: middle;
      }
      :deep(tr) {
        position: relative;
        border-bottom: 1px solid $dark-yellow;
        &:last-child {
          border-bottom: none;
        }
        &:hover {
          td {
            background-color: lighten($dark-gray, 2%);
          }
        }
        td {
          line-height: 1.4;
          background-color: $dark-gray;
          vertical-align: center;
          &.first-col {
            position: sticky;
            left: 0;
            z-index: 2;
            &::after {
              position: absolute;
              right: -14px;
              top: 0;
              content: '';
              display: block;
              height: 100%;
              width: 15px;
              background: linear-gradient(
                90deg,
                darken($dark-gray, 2%) 0%,
                transparentize(darken($dark-gray, 2%), 1) 100%
              );
            }
          }
        }
      }
    }
  }
}
</style>
