/**
 * Tic Tac Toe UI Components
 * A collection of reusable UI components for the Tic Tac Toe game
 */

const Components = {
  /**
   * Creates a modal for game results or confirmations
   * @param {Object} options - Modal options
   * @param {string} options.title - The modal title
   * @param {string} options.subtitle - Optional subtitle or description
   * @param {string} options.icon - Optional icon to display (x, o, etc.)
   * @param {string} options.iconColor - Color of the icon text (blue, yellow)
   * @param {Array} options.buttons - Array of button objects {text, type, action}
   * @returns {string} - HTML string for the modal
   */
  createModal({ title, subtitle = '', icon = '', iconColor = '', buttons = [] }) {
    // Generate buttons HTML
    const buttonsHTML = buttons.map(button => {
      const buttonClasses = {
        'silver': 'bg-silver shadow-inner-silver hover:bg-silver-hover',
        'yellow': 'bg-light-yellow shadow-inner-yellow hover:bg-light-yellow-hover',
        'blue': 'bg-light-blue shadow-inner-blue hover:bg-light-blue-hover'
      };
      
      return `
        <button 
          id="${button.id}" 
          class="inline-block py-3 px-5 ${buttonClasses[button.type]} rounded-xl font-bold uppercase text-dark-navy transition-all duration-300 ${button.margin || ''}"
        >
          ${button.text}
        </button>
      `;
    }).join('');
    
    // Generate icon HTML if provided
    let iconHTML = '';
    if (icon) {
      iconHTML = `
        <div class="flex items-center justify-center mt-6">
          <svg class="w-16 h-16 md:w-16 md:h-16">
            <use xlink:href="./assets/images/SVG/icon-${icon}.svg#icon-${icon}"></use>
          </svg>
          <h1 class="text-4xl font-bold uppercase ml-6 ${iconColor === 'blue' ? 'text-light-blue' : 'text-light-yellow'}">
            ${subtitle}
          </h1>
        </div>
      `;
    } else if (subtitle) {
      iconHTML = `<p class="mt-4">${subtitle}</p>`;
    }
    
    return `
      <h4 class="${icon ? 'text-base' : 'text-4xl'} font-bold uppercase">${title}</h4>
      ${iconHTML}
      <div class="mt-8">
        ${buttonsHTML}
      </div>
    `;
  },
  
  /**
   * Creates a scoreboard item
   * @param {Object} options - Scoreboard item options
   * @param {string} options.id - Element ID
   * @param {string} options.label - Label text
   * @param {string} options.value - Current value
   * @param {string} options.bgColor - Background color class
   * @returns {string} - HTML string for the scoreboard item
   */
  createScoreItem({ id, label, value, bgColor }) {
    return `
      <div id="${id}" class="text-dark-navy uppercase py-3 md:py-4 px-4 md:px-10 rounded-2xl ${bgColor}">
        ${label} <span id="${id}-inner" class="block text-xl md:text-2xl font-bold">${value}</span>
      </div>
    `;
  },
  
  /**
   * Creates a button
   * @param {Object} options - Button options
   * @param {string} options.id - Button ID
   * @param {string} options.text - Button text
   * @param {string} options.type - Button type (yellow, blue, silver)
   * @param {boolean} options.isLarge - Whether the button is large or small
   * @param {string} options.additionalClasses - Additional CSS classes
   * @returns {string} - HTML string for the button
   */
  createButton({ id, text, type, isLarge = true, additionalClasses = '' }) {
    const buttonClasses = {
      'yellow': isLarge 
        ? 'bg-light-yellow shadow-inner-yellow-lg hover:bg-light-yellow-hover' 
        : 'bg-light-yellow shadow-inner-yellow hover:bg-light-yellow-hover',
      'blue': isLarge 
        ? 'bg-light-blue shadow-inner-blue-lg hover:bg-light-blue-hover' 
        : 'bg-light-blue shadow-inner-blue hover:bg-light-blue-hover',
      'silver': isLarge 
        ? 'bg-silver shadow-inner-silver-lg hover:bg-silver-hover' 
        : 'bg-silver shadow-inner-silver hover:bg-silver-hover'
    };
    
    const sizeClasses = isLarge 
      ? 'block w-full text-xl py-6 px-12 mb-4' 
      : 'inline-block py-3 px-5';
    
    return `
      <button 
        id="${id}" 
        class="${sizeClasses} font-bold text-dark-navy uppercase text-center border-0 rounded-2xl transition-all duration-300 hover:cursor-pointer ${buttonClasses[type]} ${additionalClasses}"
      >
        ${text}
      </button>
    `;
  },
  
  /**
   * Creates an icon
   * @param {Object} options - Icon options
   * @param {string} options.name - Icon name (x, o, restart, etc.)
   * @param {string} options.width - Width of the icon
   * @param {string} options.height - Height of the icon
   * @param {string} options.fill - Fill color
   * @returns {string} - HTML string for the icon
   */
  createIcon({ name, width, height, fill = '' }) {
    const fillClass = fill ? `fill-${fill}` : '';
    
    return `
      <svg class="${width} ${height} ${fillClass}">
        <use xlink:href="./assets/images/SVG/icon-${name}.svg#icon-${name}"></use>
      </svg>
    `;
  },
  
  /**
   * Updates the turn indicator
   * @param {boolean} isOTurn - Whether it's O's turn
   * @returns {string} - HTML string for the turn indicator
   */
  createTurnIndicator(isOTurn) {
    const currentPlayer = isOTurn ? 'o' : 'x';
    
    return `
      <svg class="w-5 h-5 fill-silver">
        <use xlink:href="./assets/images/SVG/icon-${currentPlayer}-default.svg#icon-${currentPlayer}-default"></use>
      </svg> &nbsp; Turn
    `;
  },
  
  /**
   * Creates a loading indicator for the CPU's turn
   * @returns {string} - HTML string for the loading indicator
   */
  createLoadingIndicator() {
    return `
      <div class="flex items-center justify-center">
        <p class="mr-3">Your opponent is thinking</p>
        <div class="animate-pulse flex space-x-1">
          <div class="w-2 h-2 bg-silver rounded-full"></div>
          <div class="w-2 h-2 bg-silver rounded-full"></div>
          <div class="w-2 h-2 bg-silver rounded-full"></div>
        </div>
      </div>
    `;
  }
};

// Export the components
window.Components = Components;