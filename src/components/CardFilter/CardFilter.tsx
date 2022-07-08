import React, { useReducer } from 'react';
import { TraitDropdown } from './TraitDropdown';
import TraitList from './../TraitList/TraitList';
import TraitDetail from '../TraitDetail/TraitDetail';
import type { Trait } from '../../types/trait';
import './CardFilter.scss';

type Action =
  | { type: 'add'; trait: Trait }
  | { type: 'remove'; index: number }
  | { type: 'clear' };
const CardFilter: React.FC<{}> = () => {
  const [traits, dispatch] = useReducer((state: Trait[], action: Action) => {
    switch (action.type) {
      case 'add':
        if (
          action.trait.type !== 'common' &&
          state.filter((x) => x.type === action.trait.type).length >= 3
        )
          return state;
        if (
          state.some(
            (x) => x.name === action.trait.name && x.type === action.trait.type
          )
        )
          return state;
        return [...state, action.trait];
      case 'remove':
        return state.filter((_, i) => i !== action.index);
      case 'clear':
        return [];
    }
  }, []);

  return (
    <div>
      <div className={`CardFilter`}>
        <TraitDropdown
          items={traitData}
          type="status"
          onChange={(_, v) =>
            v && dispatch({ type: 'add', trait: { name: v, type: 'status' } })
          }
        />
        <TraitDropdown
          items={traitData}
          type="aptitude"
          onChange={(_, v) =>
            v && dispatch({ type: 'add', trait: { name: v, type: 'aptitude' } })
          }
        />
        <TraitDropdown
          items={traitData}
          type="unique"
          onChange={(_, v) =>
            v && dispatch({ type: 'add', trait: { name: v, type: 'unique' } })
          }
        />
        <TraitDropdown
          items={traitData}
          type="common"
          onChange={(_, v) =>
            v && dispatch({ type: 'add', trait: { name: v, type: 'common' } })
          }
        />
      </div>
      <div className={`TraitListWrapper`}>
        <TraitList>
          {traits.map((trait, index) => (
            <TraitDetail
              trait={trait}
              onClick={() => dispatch({ type: 'remove', index })}
            />
          ))}
        </TraitList>
        <button onClick={() => dispatch({ type: 'clear' })}>클리어</button>
      </div>
    </div>
  );
};

const traitData = [
  '스태미나',
  '파워',
  '단거리',
  '마일',
  '더트',
  '장거리',
  '우마무스메 애호가',
  '꼬리의 폭포오르기',
  '마일의 지배자',
  '장거리 코너◎',
  '두려워하지 않는 마음',
  '전개 살피기',
  '신들린 스텝',
  '하교 후의 스페셜리스트',
  '파란주의포!',
  '불침함, 출항!!',
  '오퍼레이션 Cacao',
  '∴win Q.E.D.',
  'G00 1st.F∞;',
];

export default CardFilter;
