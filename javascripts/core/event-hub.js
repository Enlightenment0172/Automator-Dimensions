class EventHub {
  constructor() {
    this._handlers = {};
  }

  on(event, fn, target) {
    let handlers = this._handlers[event];
    if (handlers === undefined) {
      handlers = [];
      this._handlers[event] = handlers;
    }
    handlers.push({ fn, target });
  }

  offAll(target) {
    for (const handlers in this._handlers) {
      this._handlers[handlers] = this._handlers[handlers]
        .filter(handler => handler.target !== target);
    }
  }

  // eslint-disable-next-line max-params
  dispatch(event, a1, a2, a3) {
    const handlers = this._handlers[event];
    if (handlers === undefined) return;
    for (const handler of handlers) {
      handler.fn(a1, a2, a3);
    }
  }

  // eslint-disable-next-line max-params
  static dispatch(event, a1, a2, a3) {
    EventHub.logic.dispatch(event, a1, a2, a3);
    GameUI.dispatch(event, a1, a2, a3);
  }

  static get stats() {
    // For debug/profiling purposes
    function countHandlers(eventHub) {
      return Object.values(eventHub._handlers)
        .map(handlers => handlers.length)
        .sum();
    }
    return `UI(UPDATE/Total): ${EventHub.ui._handlers[GameEvent.UPDATE].length}/${countHandlers(EventHub.ui)}; ` +
      `Logic(Total): ${countHandlers(EventHub.logic)}`;
  }
}

EventHub.logic = new EventHub();
EventHub.ui = new EventHub();

const GameEvent = {
  // Ticks
  GAME_TICK_BEFORE: "GAME_TICK_BEFORE",
  GAME_TICK_AFTER: "GAME_TICK_AFTER",
  REPLICANTI_TICK_BEFORE: "REPLICANTI_TICK_BEFORE",
  REPLICANTI_TICK_AFTER: "REPLICANTI_TICK_AFTER",

  // Resets
  DIMBOOST_BEFORE: "DIMBOOST_BEFORE",
  DIMBOOST_AFTER: "DIMBOOST_AFTER",
  GALAXY_RESET_BEFORE: "GALAXY_RESET_BEFORE",
  GALAXY_RESET_AFTER: "GALAXY_RESET_AFTER",
  SACRIFICE_RESET_BEFORE: "SACRIFICE_RESET_BEFORE",
  SACRIFICE_RESET_AFTER: "SACRIFICE_RESET_AFTER",
  BIG_CRUNCH_BEFORE: "BIG_CRUNCH_BEFORE",
  BIG_CRUNCH_AFTER: "BIG_CRUNCH_AFTER",
  ETERNITY_RESET_BEFORE: "ETERNITY_RESET_BEFORE",
  ETERNITY_RESET_AFTER: "ETERNITY_RESET_AFTER",
  REALITY_RESET_BEFORE: "REALITY_RESET_BEFORE",
  REALITY_RESET_AFTER: "REALITY_RESET_AFTER",

  // Glyphs
  GLYPHS_CHANGED: "GLYPHS_CHANGED",
  GLYPH_SACRIFICED: "GLYPH_SACRIFICED",

  // Break Infinity
  BREAK_INFINITY: "BREAK_INFINITY",
  FIX_INFINITY: "FIX_INFINITY",

  // Other
  INFINITY_DIMENSION_UNLOCKED: "INFINITY_DIMENSION_UNLOCKED",
  ACHIEVEMENT_UNLOCKED: "ACHIEVEMENT_UNLOCKED",
  CHALLENGE_FAILED: "CHALLENGE_FAILED",
  REALITY_UPGRADE_BOUGHT: "REALITY_UPGRADE_BOUGHT",
  PERK_BOUGHT: "PERK_BOUGHT",
  BLACK_HOLE_UPGRADE_BOUGHT: "BLACK_HOLE_UPGRADE_BOUGHT",

  // UI Events
  UPDATE: "UPDATE",
  TAB_CHANGED: "TAB_CHANGED",
};