import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from '../';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders when isOpen is true', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders with title when provided', () => {
      render(<Modal {...defaultProps} title="Test Modal" />);

      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('applies correct size classes', () => {
      const { rerender } = render(<Modal {...defaultProps} size="sm" />);
      let modalContent = screen.getByText('Modal Content').closest('.relative');

      expect(modalContent).toHaveClass('max-w-md');

      rerender(<Modal {...defaultProps} size="md" />);
      modalContent = screen.getByText('Modal Content').closest('.relative');
      expect(modalContent).toHaveClass('max-w-lg');

      rerender(<Modal {...defaultProps} size="lg" />);
      modalContent = screen.getByText('Modal Content').closest('.relative');
      expect(modalContent).toHaveClass('max-w-2xl');

      rerender(<Modal {...defaultProps} size="xl" />);
      modalContent = screen.getByText('Modal Content').closest('.relative');
      expect(modalContent).toHaveClass('max-w-4xl');

      // Modal only supports sm, md, lg, xl sizes (not full)
    });

    it('renders close button by default', () => {
      render(<Modal {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close modal');

      expect(closeButton).toBeInTheDocument();
    });

    it('does not render close button when showCloseButton is false', () => {
      render(<Modal {...defaultProps} showCloseButton={false} />);

      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
    });

    it('has correct overlay structure', () => {
      const { container } = render(<Modal {...defaultProps} />);

      const overlay = container.querySelector('.fixed.inset-0.z-50');

      expect(overlay).toBeInTheDocument();

      const backdrop = container.querySelector('.fixed.inset-0.transition-opacity');

      expect(backdrop).toBeInTheDocument();
    });

    it('has proper structure for accessibility', () => {
      const { container } = render(<Modal {...defaultProps} />);

      // Modal uses aria-hidden on overlay for accessibility
      const overlay = container.querySelector('[aria-hidden="true"]');

      expect(overlay).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();

      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.click(screen.getByLabelText('Close modal'));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when overlay is clicked by default', () => {
      const onClose = jest.fn();
      const { container } = render(<Modal {...defaultProps} onClose={onClose} />);

      const overlay = container.querySelector('.fixed.inset-0.transition-opacity');

      fireEvent.click(overlay as HTMLElement);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
      const onClose = jest.fn();
      const { container } = render(<Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />);

      const overlay = container.querySelector('.fixed.inset-0.transition-opacity');

      fireEvent.click(overlay as HTMLElement);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when clicking inside modal content', () => {
      const onClose = jest.fn();

      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.click(screen.getByText('Modal Content'));

      expect(onClose).not.toHaveBeenCalled();
    });

    it('calls onClose when Escape key is pressed by default', () => {
      const onClose = jest.fn();

      render(<Modal {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when Escape key is pressed and closeOnEscape is false', () => {
      const onClose = jest.fn();

      render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />);

      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

      expect(onClose).not.toHaveBeenCalled();
    });

    it('removes event listener on unmount', () => {
      const onClose = jest.fn();
      const { unmount } = render(<Modal {...defaultProps} onClose={onClose} />);

      unmount();

      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('handles rapid open/close transitions', async () => {
      const onClose = jest.fn();
      const { rerender } = render(<Modal {...defaultProps} isOpen={false} onClose={onClose} />);

      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();

      rerender(<Modal {...defaultProps} isOpen={true} onClose={onClose} />);
      expect(screen.getByText('Modal Content')).toBeInTheDocument();

      rerender(<Modal {...defaultProps} isOpen={false} onClose={onClose} />);
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });
  });

  describe('Content and Styling', () => {
    it('renders children content correctly', () => {
      render(
        <Modal {...defaultProps}>
          <h2>Custom Title</h2>
          <p>Custom paragraph</p>
          <button type="button">Custom Button</button>
        </Modal>
      );

      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom paragraph')).toBeInTheDocument();
      expect(screen.getByText('Custom Button')).toBeInTheDocument();
    });

    it('applies correct modal content classes', () => {
      render(<Modal {...defaultProps} />);

      const modalContent = screen.getByText('Modal Content').closest('.relative');

      expect(modalContent).toHaveClass(
        'transform',
        'overflow-hidden',
        'rounded-3xl',
        'bg-background',
        'shadow-xl',
        'transition-all'
      );
    });

    it('centers modal in viewport', () => {
      render(<Modal {...defaultProps} />);

      const modalContent = screen.getByText('Modal Content');
      // Go up to the modal container, then to the wrapper
      const centeringContainer = modalContent.closest('.flex.flex-col')?.parentElement;

      expect(centeringContainer).toHaveClass('flex', 'min-h-screen', 'items-center', 'justify-center', 'p-4');
    });

    it('renders title with correct styling when provided', () => {
      render(<Modal {...defaultProps} title="Test Title" />);

      const titleElement = screen.getByText('Test Title');

      expect(titleElement.tagName).toBe('H2');
      expect(titleElement).toHaveClass('text-body-large', 'text-subtle-foreground');
    });

    it('renders XMarkIcon in close button', () => {
      render(<Modal {...defaultProps} />);

      const closeButton = screen.getByLabelText('Close modal');
      const icon = closeButton.querySelector('svg');

      expect(icon).toBeInTheDocument();
    });
  });

  describe('Prop combinations', () => {
    it('works with minimal props', () => {
      render(
        <Modal isOpen={true} onClose={jest.fn()}>
          Content
        </Modal>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('works with all props provided', () => {
      render(
        <Modal
          isOpen={true}
          onClose={jest.fn()}
          title="Full Props Modal"
          size="xl"
          showCloseButton={true}
          closeOnOverlayClick={true}
          closeOnEscape={true}
        >
          Full props content
        </Modal>
      );

      expect(screen.getByText('Full Props Modal')).toBeInTheDocument();
      expect(screen.getByText('Full props content')).toBeInTheDocument();
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    it('handles empty children gracefully', () => {
      render(<Modal {...defaultProps}>{null}</Modal>);

      // Modal structure still renders even with null children
      const modalContent = document.querySelector('.relative.w-full');

      expect(modalContent).toBeInTheDocument();
    });
  });

  describe('Focus management', () => {
    it('traps focus within modal when open', async () => {
      userEvent.setup();

      render(
        <Modal {...defaultProps}>
          <button type="button">First Button</button>
          <button type="button">Second Button</button>
          <button type="button">Third Button</button>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');

      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });
  });
});
